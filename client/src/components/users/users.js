import React, { useEffect, useState } from 'react';
import {Link, useHistory} from "react-router-dom";
import axios from 'axios';
import { BsTrashFill } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";
import { toast } from 'react-toastify';

export default function Users(){
  const [users, setUsers] = useState([]);

  let history = useHistory();

  useEffect(()=>{
      const getUser = async () => {
          const getUser = await axios.get('/api-user');
          setUsers(getUser.data.user);
      }
      getUser();
  },[])

  const getPower = (power) => {
      switch (power) {
          case "1":
              return "Admin";
          case "2":
              return "Trưởng ban biên tập";
          case "3":
              return "Biên tập viên";
          case "4":
              return "Cộng tác viên";
          case "5":
              return "Thư ký";
          default:
              break;
      }
  }

  const showItemAfterDelete = () => {
      setTimeout(()=>{
          axios.get("/api-user")
          .then( res => {
              setUsers(res.data.user);
          })
      },100)
  }
const Remove = async (id) => {
  if(window.confirm("Bạn chắc chắn muốn xóa người dùng này?")){
    const res = await axios.delete(`/api-user/delete/${id}`)
    if(res.data.message == "Xóa thành công"){
        showItemAfterDelete(); 
        toast.success(`Xóa thành công`)
    }else{
        toast.error(res.data.message)
    }
    
  }
}

  return(
    <div>
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
                          <th>Quản lý</th>
                          <th className="power">Quyền hạn</th>
                          <th className="edit">Sửa</th>
                          <th className="remove">Xóa</th>
                      </tr>
                      </thead>
                      <tbody>
                          {users ? 
                          users.map((item, index) => (
                              <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{item._doc.username}</td>
                                  <td>{item._doc.fullName}</td>
                                  <td>{item._doc.email}</td>
                                  <td>{item.nameDepartment}</td>
                                  <td>{item.nameBTV ? item.nameBTV : ''}</td>
                                  <td>{getPower(item._doc.power)}</td> 
                                  <td>
                                      <Link to={`/admin/users/edit/${item._doc._id}`}><BsPencil/></Link>
                                  </td>
{/* 
                                  <td>
                                      <span onClick={() => edit(item._doc._id)}><BsPencil/></span>
                                  </td> */}
                                  <td><span onClick={() => Remove(item._doc._id)}><BsTrashFill color="red"/></span></td>
                              </tr>
                          )): null}
                      </tbody>
                      
                  </table>
              </div>
          </div>
          
      </div>
  )
}