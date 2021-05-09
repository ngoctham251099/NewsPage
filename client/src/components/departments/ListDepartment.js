import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import { BsTrashFill } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";
import { toast } from "react-toastify";


function ListDepatment(props){
    let history = useHistory();
    const [departments, setDepartments] = useState([]);
    const [message, setMessage] = useState();
    let stt  = 1;
    useEffect(() => {
        axios.get('/api-department')
        .then(
            res => {    
                setDepartments(res.data.department);
            }
        )
    },[])

    
    let show_item_after_delete=()=>{
        setTimeout(()=>{
          axios.get(`/api-department`).then(res=>{
            setDepartments(res.data.department)

        })
        },100)
      }

    let Remove = async (id) =>{
      if(window.confirm("Bạn chắc chắn muốn xóa phòng ban này")){
        const res = await axios.delete(`/api-department/delete/${id}`)
        if(res.data.message == "Đã xóa thành công"){
          toast.success(res.data.message);
          show_item_after_delete();
        }else{
          toast.error(res.data.message);
        }
      }
        
    }

    const add = () => {
      history.push(`${props.path}/departments/add`)
    }

  return  (
    <div>
      <div className="card-header">
        <h3>Danh sách phòng ban</h3>
        <button onClick={add}>Thêm</button>
      </div>
      
      <div className="card-body">
      <div className="table-responsive">
        <table width="100%">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên Phòng Ban</th>
                <th>Sửa</th>
                <th>Xoá</th>
              </tr>
            </thead>
            <tbody>
              { departments.map( (item , index) => (
                <tr key={index}>
                  <td>{stt++}</td>
                  <td>
                      {item.name}
                  </td>
                  <td>
                      <Link to={`${props.path}/departments/edit/${item._id}`}><BsPencil/></Link>
                  </td>
                  <td>
                      <span onClick={() => Remove(item._id)}><BsTrashFill/></span >
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    </div>
  </div>)
}

export default ListDepatment;