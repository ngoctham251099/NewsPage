import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import { BsTrashFill } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";

function Users(){
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    let stt = 1;

    useEffect(()=>{
        const getUser = async () => {
            const getUser = await axios.get('/api-user');
            setUsers(getUser.data);
        }
        getUser();
    },[])

    const getPower = (power) => {
        switch (power) {
            case "1":
                return "Admin";
                break;
            case "2":
                return "Tổng duyệt tin";
                break;
            case "3":
                return "Sơ duyệt";
                break;
            case "4":
                return "Viết tin";
                break;
            default:
                break;
        }
    }

    const showItemAfterDelete = () => {

        setTimeout(()=>{
            axios.get("/api-user")
            .then( res => {
                setUsers(res.data);
            })
        },100)
    }


    const Remove = async (id) => {
        await axios.delete(`/api-user/delete/${id}`)
        showItemAfterDelete();
    }

    // const nameDapartment = async (id) => {
    //     const res = await axios.post(`/api-department/viewById/${id}`)
    //     let posts = res.data;

    //     setName(
    //         name.map((item) => (
    //             <td>{item.name}</td>
    //         ))
    //     )
    // }
    
    return(
        <div className="list-user">
            <h1 className="title">List user</h1>
            <button>
                <Link to="/user/add">Create user</Link>
            </button>
            <table>
                <thead>
                <tr>
                    <th className="stt">STT</th>
                    <th className="username">Tên người dùng</th>
                    <th className="email">Email</th>
                    <th className="department">Phòng ban</th>
                    <th className="power">Quyền hạn</th>
                    <th className="edit">Edit</th>
                    <th className="remove">Remove</th>
                </tr>
                </thead>
                <tbody>
                    {users.map(item => (
                        <tr key={item._id}>
                            <td>{stt++}</td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.department}</td>
                            <td>{getPower(item.power)}</td>
                            <td>
                                <Link to={`/user/edit/${item._id}`}><BsPencil/></Link>
                            </td>
                            <td><button onClick={() => Remove(item._id)}><BsTrashFill/></button></td>
                        </tr>
                    ))}
                </tbody>
                
            </table>
            
        </div>
    )
}

export default Users;