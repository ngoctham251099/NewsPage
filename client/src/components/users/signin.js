import React,{ useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import "../Design/css/Signin.css"
import image3 from "../images/logo3.svg";

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
                console.log(res.data.auth)
                if(res.data.auth){
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('idUser', res.data.user._id);
                    setMessage(res.data.message);
                    console.log(res.data.user.power);
                    setPower(res.data.user.power);
                    if(res.data.user.power === "1"){
                        localStorage.setItem("power", res.data.user.power);
                        history.replace(`/admin`)
                    }else if(res.data.user.power === "2"){
                        localStorage.setItem("power",  res.data.user.power);
                        history.replace(`/chief-editor`)
                    }else if(res.data.user.power === "3"){
                        localStorage.setItem("power", res.data.user.power);
                        history.replace(`/editor`)
                    }else if(res.data.user.power === "4"){
                        localStorage.setItem("power",  res.data.user.power);
                        history.replace(`/news-writer`)
                    }else if(res.data.user.power === "5"){
                        localStorage.setItem("power",  res.data.user.power);
                        history.replace(`/secretary`)
                    }else{
                        console.log("shd")

                    }
                }else{
                    console.log(res.data.message)
                    setMessage(res.data.message);
                }

                
            }
        )
    }

    const onChangeEmail = (event) => {
        console.log(event.target.value)
        setEmail(event.target.value);
    }

    const onChangePassword = (event) => {
        console.log(event.target.value)
        setPassword(event.target.value);
    }

    // const userAuthenticated = () => {
    //     axios.get('/api/example',{
    //         headers: {"x-access-token": localStorage.getItem('token')}
    //     })
    //     .then(
    //         res => {
    //            // console.log(res.data.auth);
    //             setPower(res.data.user.power);
    //         }
    //     )
    // }

    // const clickSignUp = () => {
    //     const container = document.querySelector(".container");

    //     document.addEventListener("click", () => {
    //         container.classList.add("sign-up-mode");
    //       });
    // }

    // const clickSignIn = () => {
    //     const container = document.querySelector(".container");

    //     document.addEventListener("click", () => {
    //         container.classList.remove("sign-up-mode");
    //     });
    // }

    return(
        <div>
                {/* <h1>Signin</h1> */}
                {(message) ? (
                    <div>{message}</div>
                ):null}
                {/* <input type="text" placeholder='email' onChange={onChangeEmail}></input>
                <input type="password" placeholder='password' onChange={onChangePassword}></input>
                <button onClick={logIn}>submit</button>
                <button onClick={userAuthenticated}> check</button>
                <Link to='/forgot-password'>Forgot password</Link> */}

                <div class="container" >
                    <div class="forms-container">
                        <div class="forms-container">
                            <div class="signin-signup">
                            {(message) ? (
                                <h2>{message}</h2>
                            ):null}
                            <div class="sign-in-form form">
                                <h2 class="title">Sign in</h2>
                                <div class="input-field">
                                <i class="fas fa-user"></i>
                                <input type="text" placeholder="Email" onChange={onChangeEmail}/>
                                </div>
                                <div class="input-field">
                                <i class="fas fa-lock"></i>
                                <input type="password" placeholder="Password" onChange={onChangePassword}/>
                                </div>
                                <button onClick={
                                    ()=> history.push("/forgot-password")
                                    }>
                                        Forgot password
                                </button>
                                {/* < type="submit" value="Login" class="btn solid" onClick={logIn}/> */}
                                <button class="btn solid" color="red" onClick={logIn}>Sign In</button>
                                <p class="social-text">Or Sign in with social platforms</p>
                                
                            </div>
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
                            <button class="btn transparent" id="sign-up-btn" onClick={
                                ()=> {
                                    history.push('/signup')
                                }
                            }>
                                SIGN UP
                            </button>
                        </div>
                        <img src={image3} class="image" alt="" />
                        </div>
                    </div>
                </div>
        </div>
    )

}

export default SignIn;