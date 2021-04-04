import React, { useState, useEffect} from 'react';
import axios from 'axios';
import image1 from "../images/logo.svg";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { IoKeyOutline } from "react-icons/io5";
import { AiFillLock } from "react-icons/ai";
import { BsFillHouseFill } from "react-icons/bs";
import { useHistory } from 'react-router-dom';
function SingUp(){
    let history = useHistory();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');
    const [status,setStatus] = useState('');
    const [departments, setDepartments] = useState([]);
    
    useEffect(() => {
        axios.get('/api-department/index')
        .then(
            res => {
                console.log(res.data.department);
                setDepartments(res.data.department);
            }
        )
    },[])

    const register = (event) => {
        event.preventDefault()
        axios.post('/api-user/signup',{
            username: username,
            email: email,
            department: department,
            password: password,
            confirmPassword: confirmPassword
        })
        .then(res => {
            console.log(res.data.message)
            setStatus(res.data.message)
        
            console.log(res.data.info)
            
            if(res.data.info){
              history.replace('/')
            }else
            {
              setStatus(res.data.message)
            }
        })
    }

    const onChangeName = (event) => {
        setUsername(event.target.value);
    }

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const onChangeDepartment = (event) => {
        setDepartment(event.target.value);
    }

    const onChangePassword = (event) => {
        console.log(event.target.value)
        setPassword(event.target.value);
    }

    const onChangeConfig = (event) => {
       setConfirmPassword(event.target.value);
    }
    
    return(
        <div>
            <div class="container sign-up-mode" >
                <div class="forms-container">
                    <div class="forms-container">
                        <div class="signin-signup">
                        <div>
                              {(status) ? (
                                  <p>{status}</p>
                              ): null}
                            </div>
                        <form class="sign-up-form">
                            
                            <h2 class="title">Sign up</h2>
                            <div class="input-field">
                              <i class="fas fa-user"><AiOutlineUser className="icon"/></i>
                              <input type="text" placeholder="Username" onChange={onChangeName}/>
                            </div>
                            <div class="input-field">
                              <i class="fas fa-envelope"><AiOutlineMail/></i>
                              <input type="email" placeholder="Email" onChange={onChangeEmail}/>
                            </div>
                            <div class="input-field">
                              <i class="fas fa-lock"><IoKeyOutline/></i>
                              <input type="password" placeholder="Password" onChange={onChangePassword}/>
                            </div>
                            <div class="input-field">
                              <i class="fas fa-lock"><BsFillHouseFill/></i>
                              <select onChange={onChangeDepartment} value={department}>
                                  <option value="0">---Chon phong ban---</option>
                                  {departments.map((item)=> (
                                      <option value={item.name} className="input-field">{item.name}</option>
                                  ))}
                              </select>
                            </div>
                            <div class="input-field">
                              <i class="fas fa-lock"><AiFillLock/></i>
                              <input type="password" placeholder="Confirm password" onChange={onChangeConfig} />
                            </div>
                              {/* <input onClick={register}  class="btn" value="             Sign up"/> */}
                              <button class="btn" onClick={register}>Sign Up</button>
                              
                              <p class="social-text">Or Sign up with social platforms</p>
                        </form>
                        </div>
                    </div>
                </div>

                <div class="panels-container">
                    <div class="panel left-panel">
                    </div>
                    <div class="panel right-panel">
                    <div class="content">
                        <h3>One of us ?</h3>
                        <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                        laboriosam ad deleniti.
                        </p>
                        <button class="btn transparent" id="sign-in-btn" onClick={
                            () => {
                                history.push('/')
                            }
                        }>
                          Sign in
                        </button>
                    </div>
                        <img src={image1} class="image" alt="" />
                    </div>
                </div>
            </div>
    </div>
    )
}

export default SingUp;