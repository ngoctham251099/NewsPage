import React, { useState, useEffect } from "react";
import {  useHistory } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";

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
                
                if(res.data.message === 'Exercise update'){
                    toast.success("Cập nhật thành công")
                    history.push(`${props.path}/categories`);
                }else{
                    toast.error(res.data.message);
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
      <h3 style={{ marginBottom: 20 }}>Cập nhật</h3>
            <Input ref={React.createRef()} onChange={onChange} value={categories.name}></Input>
            <Button onClick={onSubmit} title="Cập nhật">Submit</Button>
        </div>  
    )
}