import React, { useState, useEffect } from "react";
import {  useHistory } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";

import Button from "../UI/button-add";
import Input from "../UI/Input";

export default function UpdateDepartment(props){

   const [department, setDepartment] = useState([]);
   const [message, setMessage] = useState();
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
                if(res.data.message == "Exercise update"){
                    toast.success("Cập nhật thành công")
                    history.push(`${props.path}/departments`);
                }else{
                    toast.error(res.data.message)
                }
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }

    return(
        <div className="create-user-wrapper">
      <h3 style={{ marginBottom: 20 }}>Cập nhật phòng ban</h3>
            <Input ref={React.createRef()} onChange={onChange} value={department.name}></Input>
            <Button onClick={onSubmit} title="Cập nhật">Submit</Button>
        </div>  
    )
}