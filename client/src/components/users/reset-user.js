import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";

export default function Reset(props){
    // const [TestUpdate, setTestUpdate] = useState({
    //     update: '',
    //     error: ''
    // });
    const [newUser, setNewUser] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [message, setMessage] = useState();

    let history = useHistory();

    useEffect( () => {
        console.log(props.match.params.token);
        axios.get(`http://localhost:5000/api-user/reset/${props.match.params.token}`,{
            token: props.match.params.token
        })
        .then(
            response => {
                console.log(response)
                if(response.data.message == "password reset link a-ok"){
                    setNewUser( response.data.user)
                }
            }
        )
        .catch(
            error => {
                console.log(error)
            }
        )
    },[])

    const onChangeConfigPassword = (event) => {
        setConfirmPassword(event.target.value)
    } 
    
    const onChange = (event) => {
        setNewPassword(event.target.value)
    }

    const updatePassword = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api-user/updatePasswordViaEmail/${props.match.params.token}`, {
            confirmPassword: confirmPassword,
            newPassword: newPassword
        })
        .then( response => {
            setMessage(response.data.message);
            history.push('/');
        })
        .catch(
            error => {
                console.log(error.data);
            }
        )
    }
    
    return(
        <div>
            {message ? (
                <div>{message}</div>
            ): null}
            <input type="password" onChange={onChange} placeholder="New password"></input>
            <input type="password" onChange={onChangeConfigPassword}  placeholder="Confirm password"></input>
            <button onClick={updatePassword}>update</button>
        </div>
    )
}