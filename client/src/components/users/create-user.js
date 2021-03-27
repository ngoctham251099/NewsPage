import React, { useState, useEffect} from 'react';
import axios from 'axios';

import Input from '../UI/Input'
import Select from '../UI/select';
import Button from '../UI/button-add';

function CreateUSer(){

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
            confirmPassword: config
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
            <h1>Create user</h1>
            {(status) ? (
                <p>{status}</p>
            ): null}
            <label>Tên người dùng</label>
            <Input type="text" placeholder="Username" onChange={onChangeName} value={username}></Input>
            <label>Email</label>
            <Input type="email" placeholder="Email" onChange={onChangeEmail} value={email}></Input>
            <label>Phòng ban</label>
            {/* <select onChange={onChangeDepartment} value={department}>
                <option value="0">---Chon phong---</option>
                {departments.map((item)=> (
                            <option value={item._id}>{item.name}</option>
                ))}
            </select> */}

            <Select onChange={onChangeDepartment} list={departments}></Select>
            <label>Mật khẩu</label>
            <Input type="password" placeholder="Password" onChange={onChangePassword} value={password}></Input>
            <label>Nhập lại mật khẩu</label>
            <Input type="password" placeholder="Config Password" onChange={onChangeConfig} value={config}></Input>
            <Button onClick={register}></Button>
        </div>
    )
}

export default CreateUSer;