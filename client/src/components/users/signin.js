import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../Design/css/Signin.css";
import image3 from "../images/logo3.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cookie from 'react-cookies';

function SignIn(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const [power, setPower] = useState();
  let history = useHistory();

  const logIn = () => {
    axios
      .post("/api-user/login", {
        email: email,
        password: password,
      })
      .then((res) => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
        console.log(res.data.auth);
        if (res.data.auth) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("idUser", res.data.user._id);
         // cookie.save('idUser', res.data._id, {  path: '/', signed: true, httpOnly: true })  
      //    setCookie('token', res.data.token, { signed: true, httpOnly: true })  
          
          setMessage(res.data.message);
          setPower(res.data.user.power);
          if (res.data.user.power === "1") {
            localStorage.setItem("power", res.data.user.power);
            history.replace(`/admin`);
          } else if (res.data.user.power === "2") {
            localStorage.setItem("power", res.data.user.power);
            history.replace(`/chief-editor`);
          } else if (res.data.user.power === "3") {
            localStorage.setItem("power", res.data.user.power);
            history.replace(`/editor`);
          } else if (res.data.user.power === "4") {
            localStorage.setItem("power", res.data.user.power);
            history.replace(`/news-writer`);
          } else if (res.data.user.power === "5") {
            localStorage.setItem("power", res.data.user.power);
            history.replace(`/secretary`);
          } else {
            // console.log("shd");
            return;
          }
        } else {
          toast.error(res.data.message);
        }
      });
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <div class="container">
        <div class="forms-container">
          <div class="forms-container">
            <div class="signin-signup">
              {message ? <h2>{message}</h2> : null}
              <div class="sign-in-form form">
                <h2 class="title">Đăng nhập</h2>
                <div class="input-field">
                  <i class="fas fa-user"></i>
                  <input
                    type="text"
                    placeholder="Email"
                    onChange={onChangeEmail}
                  />
                </div>
                <div class="input-field">
                  <i class="fas fa-lock"></i>
                  <input
                    type="password"
                    placeholder="Mật khẩu"
                    onChange={onChangePassword}
                  />
                </div>
                {/* < type="submit" value="Login" class="btn solid" onClick={logIn}/> */}
                <button class="btn solid" color="red" onClick={logIn}>
                  Đăng nhập
                </button>
                <a href="#" onClick={() => history.push("/forgot-password")}>
                  Quên mật khẩu
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="panels-container">
          <div class="panel left-panel">
            <div class="content">
              <h3>Chào mừng bạn !</h3>
              
            </div>
            <img src={image3} class="image" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
