import React,{ useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, useHistory, Switch } from 'react-router-dom';
import "../Design/css/Signin.css"
import image3 from "../images/logo3.svg";
import SingUp from './signup';


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
                    localStorage.setItem('idUser', res.data.user._id)
                    setMessage(res.data.message);
                    console.log(res.data.user.power);
                    setPower(res.data.user.power);
                    if(res.data.user.power === "1"){
                        console.log('ahsbdjha')
                        localStorage.setItem("power", res.data.user.power);
                        console.log({pathname: "shsf"});
                        history.replace("/");
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
                    console.log(res.data.message)
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

    const clickSignUp = () => {
        const container = document.querySelector(".container");

        document.addEventListener("click", () => {
            container.classList.add("sign-up-mode");
          });
    }

    const clickSignIn = () => {
        const container = document.querySelector(".container");

        document.addEventListener("click", () => {
            container.classList.remove("sign-up-mode");
        });
    }

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
                        <form action="#" class="sign-in-form">
                            <h2 class="title">Sign in</h2>
                            <div class="input-field">
                            <i class="fas fa-user"></i>
                            <input type="text" placeholder="Email" onChange={onChangeEmail}/>
                            </div>
                            <div class="input-field">
                            <i class="fas fa-lock"></i>
                            <input type="password" placeholder="Password" onChange={onChangePassword}/>
                            </div>
                            <p><Link to='/forgot-password'>Forgot password</Link></p>
                            {/* < type="submit" value="Login" class="btn solid" onClick={logIn}/> */}
                            <button class="btn solid" color="red" onClick={logIn}>submit</button>
                            <p class="social-text">Or Sign in with social platforms</p>
                            
                        </form>
                        {/* <form action="#" class="sign-up-form">
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
                            <input type="submit" class="btn" value="Sign up"/>
                            <p class="social-text">Or Sign up with social platforms</p>
                        </form> */}
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
                            <Link to="/signup">SIGN UP</Link>
                        
                        </button>
                    </div>
                    <img src={image3} class="image" alt="" />
                    </div>
                    {/* <div class="panel right-panel">
                    <div class="content">
                        <h3>One of us ?</h3>
                        <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                        laboriosam ad deleniti.
                        </p>
                        <button class="btn transparent" id="sign-in-btn" onClick={clickSignIn} >
                        Sign in
                        </button>
                    </div>
                        <img src={image1} class="image" alt="" />
                    </div> */}
                </div>
            </div>

            <Router>
                <Switch>
                    <Route path="/signup">
                        <SingUp/>
                    </Route>
                </Switch>
            </Router>
        </div>
    )

}

export default SignIn;