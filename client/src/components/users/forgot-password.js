import React, {useState} from  'react';
import {  useHistory} from "react-router-dom";
import axios from 'axios';

export default function ForgotPassword(){
    // let history = useHistory();
    const [userForgot, setUserForgot] = useState({
        email: "",
        showError: false,
        messageFromServer: ""
    });

    const [message, setMessage] = useState();

    const sendMail = () => {
        // console.log('ashdkasuhk')
        // let res = await axios.post('/api-user/forgotPassword', {
        //     email: userForgot.email
        // })
        // console.log(res.data);
        
            axios.post('/api-user/forgotPassword', {
                email: userForgot.email
            })
            .then(
                res => {
                    // if(res.data .message=== "No account with that email address exits"){
                    //     userForgot.showError = true;
                    //     userForgot.messageFromServer = '';
                    //     setMessage(res.data.message)
                    // }

                    //setMessage(res.data)
                    // }else if(res.data === 'recovery email sent'){
                    //     userForgot.showError = false;
                    //     userForgot.messageFromServer = 'recovery email sent';
                    // }
                    setMessage(res.data.message)
                    console.log(res.data.message);
                    
                }
            )
            .catch(function (error) {
                if (error.response) {
                  // Request made and server responded
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log('Error', error.message);
                }
            })
    }

        
   const handleChange = event => {
        setUserForgot({...userForgot, email: event.target.value})
    }

    return(

        <div>
            <h1>Forgot Password</h1>
            {message ? (
                    <div>{message}</div>
                ): null}
                
                <input 
                    value={userForgot.email}
                    id="email"
                    onChange={handleChange}
                    placeholder="Email Address"
                ></input>
                <button onClick={() => sendMail()}>Submit</button>


            {userForgot.showError && (
                <div>
                    <p>That email address isn't recognized. Please try again or register for a neww account.</p>
                </div>
            )}
            {
                userForgot.messageFromServer === "recovery email sent" && (
                    <div>
                        <h3>Password Reset Email Successfully Sen!</h3>
                    </div>
                )
            }
        </div>
    )

}