import React, { useState, useEffect } from "react";
import {  useHistory } from "react-router-dom";
import axios from 'axios';

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
        setDepartment(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post(`/api-department/update/${props.match.params.id}`,{
            nameChange : department
        })
        .then(
            res => {
                history.push('/department');
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
            {
                console.log(department.name)
            }
            <form onSubmit={onSubmit}>
                <input name="name" type="text" ref={React.createRef()} onChange={onChange
                } value={department.name}></input>
                <button type="submit">Submit</button>
            </form>
            
            
        </div>
    )
}