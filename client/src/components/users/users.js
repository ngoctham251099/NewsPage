import React, { useEffect, useState } from 'react';
import {Link, useHistory} from "react-router-dom";
import axios from 'axios';
import { BsTrashFill } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";

export default function Users(){
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    let stt = 1;

    let history = useHistory();

    useEffect(()=>{
        const getUser = async () => {
            const getUser = await axios.get('http://3.130.135.8/api/api-user');
            setUsers(getUser.data);
        }
        getUser();
    },[])

    const getPower = (power) => {
        switch (power) {
            case "1":
                return "Admin";
            case "2":
                return "Tổng biên tập";
            case "3":
                return "Biên tập viên";
            case "4":
                return "Nhân viên";
            case "5":
                return "Thư ký";
            default:
                break;
        }
    }

    const showItemAfterDelete = () => {

        setTimeout(()=>{
            axios.get("http://3.130.135.8/api/api-user")
            .then( res => {
                setUsers(res.data);
                setMessage("Xóa thành công")
            })
        },100)
    }
    const Remove = async (id) => {
        await axios.delete(`http://3.130.135.8/api/api-user/delete/${id}`)
        showItemAfterDelete();
       
    }
    return(
      <div>
      {message ? (<div>{message}</div>): null}
      <div className="card-header">
				<h3>Danh sách người dùng</h3>
				<button onClick={()=>{
                history.push('/admin/users/add')
            }}>Thêm</button>
			</div>
            <div className="card-body">
                <div className="table-responsive">
                    <table width="100%">
                        <thead style={{padding:'10px 0px'}}>
                        <tr>
                            <th className="stt">STT</th>
                            <th className="username">Tên người dùng</th>
                            <th className="username">Bút danh</th>
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
                                    <td>{item.fullName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.department}</td>
                                    <td>{getPower(item.power)}</td> 
                                    <td>
                                        <Link to={`/admin/users/edit/${item._id}`}><BsPencil/></Link>
                                    </td>
                                    <td><span onClick={() => Remove(item._id)}><BsTrashFill color="red"/></span></td>
                                </tr>
                            ))}
                        </tbody>
                        
                    </table>
                </div>
            </div>
            
        </div>
    )
}