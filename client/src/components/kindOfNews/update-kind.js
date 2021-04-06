import React, { useState, useEffect } from "react";
import {  useHistory } from "react-router-dom";
import axios from 'axios';

import Button from "../UI/button-add";
import Input from "../UI/Input";

export default function UpdateKind(props){

   const [kind, setKind] = useState({
       name: '',
       unitPrice: ''
   });
    const history = useHistory();

    useEffect(() => {
       console.log(props.match.params.id)
        axios.post(`http://127.0.0.1/api/api-kind/edit/${props.match.params.id}`)
        .then(
            res => {
                setKind(res.data.kindId);
            }
        )
    },[])

    const onChangePrice = (e)=>{
        setKind({...kind, unitPrice: e.target.value});
    }

    const onChange = (e)=>{
        setKind({...kind, name: e.target.value});
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(props.match.params.id)
        axios.post(`http://127.0.0.1/api/api-kind/update/${props.match.params.id}`,{
            id: props.match.params.id,
            nameChange : kind.name,
            price: kind.unitPrice
        })
        .then(
            res => {
                history.push(`${props.path}/kinds`);
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }

    return(
        <div className="create-user-wrapper">
        <h3 style={{ marginBottom: 20 }}>Cập nhật tin</h3>
            <label>Tên loại tin</label>
            <Input ref={React.createRef()} onChange={onChange} value={kind.name}></Input>
            <label>Mệnh giá</label>
            <Input ref={React.createRef()} onChange={onChangePrice} value={kind.unitPrice}></Input>
            <Button onClick={onSubmit} title="Cập nhật">Submit</Button>
        </div>  
    )
}