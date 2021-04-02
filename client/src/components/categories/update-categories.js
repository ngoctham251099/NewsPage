import React, { useState, useEffect } from "react";
import {  useHistory } from "react-router-dom";
import axios from 'axios';

import Button from "../UI/button-add";
import Input from "../UI/Input";

export default function UpdateDepartment(props){

   const [categories, setCategories] = useState([]);
    const history = useHistory();

    useEffect(() => {
       // console.log(props.match.params.id)
        axios.post(`/api-categories/edit/${props.match.params.id}`)
        .then(
            res => {
                setCategories(res.data.categoriesId);
            }
        )
    },[])

    const onChange = (e)=>{
        console.log(e.target.value)
        setCategories(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(props.match.params.id)
        axios.post(`/api-categories/update/${props.match.params.id}`,{
            nameChange : categories
        })
        .then(
            res => {
                console.log(props.path)
                history.push(`${props.path}/categories`);
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }

    return(
        <div>
            <h1>Cập nhật</h1>
            <Input ref={React.createRef()} onChange={onChange} value={categories.name}></Input>
            <button onClick={onSubmit} title="Cập nhật">Submit</button>
            
            
        </div>  
    )
}