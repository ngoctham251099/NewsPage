import React, { useState, useEffect } from "react";
import {  useHistory } from "react-router-dom";
import axios from 'axios';

import Button from "../UI/button-add";
import Input from "../UI/Input";

export default function UpdateImages(props){

   const [images, setImages] = useState({
       name: '',
       price: ''
   });
    const history = useHistory();

    useEffect(() => {
       console.log(props.match.params.id)
        axios.post(`http://127.0.0.1/api/api-images/edit/${props.match.params.id}`)
        .then(
            res => {
                setImages(res.data.Images);
            }
        )
    },[])

    const onChange = (e)=>{
        setImages({...images, name: e.target.value});
    }

    const onChangePrice = (e)=>{
        setImages({...images, price: e.target.value});
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(props.match.params.id)
        axios.post(`http://127.0.0.1/api/api-images/update/${props.match.params.id}`,{
            id: props.match.params.id,
            nameChange : images.name,
            price: images.price
        })
        .then(
            res => {
                history.push(`${props.path}/list-images`);
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }

    return(
        <div>
            <h1>Cập nhật chuyên mục</h1>
            <label>Tên loại tin</label>
            <Input ref={React.createRef()} onChange={onChange} value={images.name}></Input>
            <label>Mệnh giá</label>
            <Input ref={React.createRef()} onChange={onChangePrice} value={images.price}></Input>
            <Button onClick={onSubmit} title="Cập nhật">Submit</Button>
        </div>  
    )
}