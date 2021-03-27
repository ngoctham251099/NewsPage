import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useHistory} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Input from '../UI/Input'
import Select from '../UI/select';

export default function UpdateUser(props){
    let history = useHistory();
    const [departments, setDepartments] = useState([]);
    const [user, setUser] = useState({
        username: "",
        department: "",
        email: "",
        power: ""
    });

    const [power, setPower] = useState([
        {id: 1 , value: "Admin"},
        {id: 2 , value: "Tổng biên tập"},
        {id: 3 , value: "Biên tập viên"},
        {id: 4 , value: "Nhân viên"},
        {id: 5 , value: "Thư ký"}
    ])
    useEffect(() => {
        axios.get('/api-department/index')
        .then(
            res => {
                //console.log(res.data.department);
                setDepartments(res.data.department);
            }
        )
    },[])

    useEffect(() => {
        console.log(props.match.params.id)
         axios.post(`/api-user/edit/${props.match.params.id}`,{
             id: props.match.params.id
         })
         .then(
             res => {
                 setUser(res.data.user);
                 //console.log(res.data.user);
             }
         )
     },[])

     const getPower = () => {
        const power = localStorage.getItem("power");
        const token = localStorage.getItem("token");

        if(token){
            switch (power) {
                case "1":
                    return "Admin";
                    break;
                case "2":
                    return "Tổng biên tập";
                    break;
                case "3":
                    return "Biên tập viên";
                    break;
                case "4":
                    return "Nhân viên";
                    break;
                default:
                    break;
            }
        }
    }

    const onChangeName = (event) => {
        setUser({...user,username:  event.target.value});
    }

    const onChangeEmail = (event) => {
        setUser({...user, email: event.target.value});
    }

    const onChangeDepartment = (event) => {
        console.log(event.target.value)
        setUser({...user, department: event.target.value});
    }

    const onChangePower = (event) => {
        console.log(event.target.value)
        setUser({...user, power: event.target.value});
    }

    const onSubmit = (e) => {
        console.log(user)
        const username = user.username;
        console.log(user.email)
        const department = user.department;
        const email = user.email;
        const power = user.power;
        e.preventDefault();
        axios.post(`/api-user/update/${props.match.params.id}`,{
            username : username,
            email: email,
            department: department,
            power: power
        })
        .then(
            res => {
                history.push('/admin/users');
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }
    return(
        <div>
            <h1>Cập nhật tài khoản</h1>
            <form>
            <label>Tên người dùng</label>
            <Input type="text" onChange={onChangeName} value={user.username} ref={React.createRef()}></Input>
            <label>Email</label>
            <Input type="email" placeholder="Email" onChange={onChangeEmail} value={user.email} ref={React.createRef()}></Input>
            <label>Phòng ban</label>

            {/* <select onChange={onChangeDepartment} value={user.department} ref={React.createRef()}>
                <option value={user.department}>{user.department}</option>
            {departments.map((item)=> (
                        <option value={item.name}>{item.name}</option>
            ))}
            </select> */}

            <Select value={user.department} onChange={onChangeDepartment} list={departments}></Select>
            <label>Quyen han</label>

            {/* <select onChange={onChangePower} ref={React.createRef()}>
                <option value={user.power}>{user.power}</option>
                <option value="1">Admin</option>
                <option value="2">Tổng duyệt tin</option>
                <option value="3">Sơ duyệt</option>
                <option value="4">Viết tin</option>
            </select> */}

            <Select onChange={onChangePower} value={user.power} listPower={power}></Select>
                {/* <input type="text" onChange={onChangePower} value={user.power} ref={React.createRef()}></input> */}
            <button onClick={onSubmit}>Submit</button>
            </form>
        </div>
    )
}