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
        axios.post(`http://localhost:5000/api-categories/edit/${props.match.params.id}`)
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
        axios.post(`http://localhost:5000/api-categories/update/${props.match.params.id}`,{
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
        <div className="create-user-wrapper">
      <h3 style={{ marginBottom: 20 }}>Cập nhật</h3>
            <Input ref={React.createRef()} onChange={onChange} value={categories.name}></Input>
            <Button onClick={onSubmit} title="Cập nhật">Submit</Button>
            
            
        </div>  
    )
}