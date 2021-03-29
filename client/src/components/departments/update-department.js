import React, { useState, useEffect } from "react";
import {  useHistory } from "react-router-dom";
import axios from 'axios';

import Button from "../UI/button-add";
import Input from "../UI/Input";

export default function UpdateDepartment(props){

   const [department, setDepartment] = useState([]);
    const history = useHistory();

    useEffect(() => {
       // console.log(props.match.params.id)
        axios.post(`/api-department/edit/${props.match.params.id}`)
        .then(
            res => {
                setDepartment(res.data.departmentId);
            }
        )
    },[])

    const onChange = (e)=>{
        console.log(e.target.value)
        setDepartment(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(props.match.params.id)
        axios.post(`/api-department/update/${props.match.params.id}`,{
            nameChange : department
        })
        .then(
            res => {
                console.log(props.path)
                history.push(`${props.path}/departments`);
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }

    return(
        <div>
            <h1>update</h1>
            <Input ref={React.createRef()} onChange={onChange} value={department.name}></Input>
            <button onClick={onSubmit} title="Cập nhật">Submit</button>
            
            
        </div>  
    )
}