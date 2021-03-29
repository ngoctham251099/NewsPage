import React, { useState, useEffect } from "react";
import {  useHistory } from "react-router-dom";
import axios from 'axios';

import Button from "../UI/button-add";
import Input from "../UI/Input";

export default function UpdateKind(props){

   const [kind, setKind] = useState([]);
    const history = useHistory();

    useEffect(() => {
       console.log(props.match.params.id)
        axios.post(`/api-kind/edit/${props.match.params.id}`)
        .then(
            res => {
                setKind(res.data.kindId);
            }
        )
    },[])

    const onChange = (e)=>{
        console.log(e.target.value)
        setKind(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(props.match.params.id)
        axios.post(`/api-kind/update/${props.match.params.id}`,{
            id: props.match.params.id,
            nameChange : kind
        })
        .then(
            res => {
                console.log(props.path)
                history.push(`${props.path}/kinds`);
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
            <Input ref={React.createRef()} onChange={onChange} value={kind.name}></Input>
            <button onClick={onSubmit} title="Cập nhật">Submit</button>
        </div>  
    )
}