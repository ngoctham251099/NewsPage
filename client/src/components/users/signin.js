import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory, useLocation } from 'react-router-dom';
 import "../Design/js/app.js";
import "../Design/css/Signin.css"
import image from "../Design/News1.png";


function SignIn(props){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState();
    const [power, setPower] = useState();
    let history = useHistory();

    const logIn = ()=>{
        axios.post('/api-user/login',
        {
            email: email,
            password: password
        }).then(
            res => {
                if(res.data.auth){
                    localStorage.setItem('token', res.data.token);
                    setMessage(res.data.message);
                    console.log(res.data.user.power);
                    setPower(res.data.user.power);
                    if(res.data.user.power === "1"){
                        console.log('ahsbdjha')
                        localStorage.setItem("power", res.data.user.power);
                        console.log({pathname: "shsf"});
                        history.replace("/admin");
                    }else if(res.data.user.power === "2"){
                        localStorage.setItem("power",  res.data.user.power);
                        history.replace("/department")
                    }else if(res.data.user.power === "3"){
                        localStorage.setItem("power", res.data.user.power);
                        history.replace("/create-news")
                    }else if(res.data.user.power === "4"){
                        localStorage.setItem("power",  res.data.user.power);
                        history.replace("/list-news")
                    }else{
                        console.log("shd")

                    }
                }else{
                    setMessage(res.data.message);
                }

                
            }
        )
    }

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const userAuthenticated = () => {
        axios.get('/api/example',{
            headers: {"x-access-token": localStorage.getItem('token')}
        })
        .then(
            res => {
               // console.log(res.data.auth);
                setPower(res.data.user.power);
            }
        )
    }

    return(
        <div>
            <h1>Signin</h1>
            {(message) ? (
                <div>{message}</div>
            ):null}
            <input type="text" placeholder='email' onChange={onChangeEmail}></input>
            <input type="password" placeholder='password' onChange={onChangePassword}></input>
            <button onClick={logIn}>submit</button>
            <button onClick={userAuthenticated}> check</button>
            <Link to='/forgot-password'>Forgot password</Link>

            <div class="container">
                <div class="forms-container">
                    <div class="forms-container">
                        <div class="signin-signup">
                        <form action="#" class="sign-in-form">
                            <h2 class="title">Sign in</h2>
                            <div class="input-field">
                            <i class="fas fa-user"></i>
                            <input type="text" placeholder="Username" />
                            </div>
                            <div class="input-field">
                            <i class="fas fa-lock"></i>
                            <input type="password" placeholder="Password" />
                            </div>
                            <input type="submit" value="Login" class="btn solid" />
                            <p class="social-text">Or Sign in with social platforms</p>
                        </form>
                        <form action="#" class="sign-up-form">
                            <h2 class="title">Sign up</h2>
                            <div class="input-field">
                            <i class="fas fa-user"></i>
                            <input type="text" placeholder="Username" />
                            </div>
                            <div class="input-field">
                            <i class="fas fa-envelope"></i>
                            <input type="email" placeholder="Email" />
                            </div>
                            <div class="input-field">
                            <i class="fas fa-lock"></i>
                            <input type="password" placeholder="Password" />
                            </div>
                            <input type="submit" class="btn" value="Sign up" />
                            <p class="social-text">Or Sign up with social platforms</p>
                        </form>
                        </div>
                    </div>
                </div>

                <div class="panels-container">
                    <div class="panel left-panel">
                    <div class="content">
                        <h3>New here ?</h3>
                        <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                        ex ratione. Aliquid!
                        </p>
                        <button class="btn transparent" id="sign-up-btn">
                        Sign up
                        </button>
                    </div>
                    <img src={image} class="image" alt="" />
                    </div>
                    <div class="panel right-panel">
                    <div class="content">
                        <h3>One of us ?</h3>
                        <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                        laboriosam ad deleniti.
                        </p>
                        <button class="btn transparent" id="sign-in-btn">
                        Sign in
                        </button>
                    </div>
                        <img src={image} class="image" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )

}

export default SignIn;