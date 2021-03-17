import React, { useState, useEffect} from 'react';
import axios from 'axios';
import "../Design/js/app"
function SingUp(){

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [password, setPassword] = useState('');
    const [config, setConfig] = useState('');
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

    const register = () => {
        axios.post('/api-user/signup',{
            username: username,
            email: email,
            department: department,
            password: password,
            configPassword: config
        })
        .then(res => {
            console.log(res.data.message)
            setStatus(res.data.message)
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
        setPassword(event.target.value);
    }

    const onChangeConfig = (event) => {
        setConfig(event.target.value);
    }
    
    return(
        <div>
            {(status) ? (
                <p>{status}</p>
            ): null}
            <label>Tên người dùng</label>
            <input type="text" placeholder="Username" onChange={onChangeName} value={username}></input>
            <label>Email</label>
            <input type="email" placeholder="Email" onChange={onChangeEmail} value={email}></input>
            <label>Phòng ban</label>
            <select onChange={onChangeDepartment} value={department}>
                <option value="0">---Chon phong---</option>
                {departments.map((item)=> (
                            <option value={item.name}>{item.name}</option>
                ))}
            </select>
            <label>Mật khẩu</label>
            <input type="password" placeholder="Password" onChange={onChangePassword} value={password}></input>
            <label>Nhập lại mật khẩu</label>
            <input type="password" placeholder="Config Password" onChange={onChangeConfig} value={config}></input>
            <button onClick={register}>Add</button>

            <div class="container">
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
            <div class="social-media">
              <a href="#" class="social-icon">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-google"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
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
            <div class="social-media">
              <a href="#" class="social-icon">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-google"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
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
          <img src="img/log.svg" class="image" alt="" />
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
          <img src="img/register.svg" class="image" alt="" />
        </div>
      </div>
    </div>
    </div>
    )
}

export default SingUp;