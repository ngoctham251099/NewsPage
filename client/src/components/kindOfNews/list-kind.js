import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import { BsTrashFill } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";
import { toast } from "react-toastify";

export default function ListKinds(props){
    let history = useHistory();
    const [kinds, setKinds] = useState([]);
    const [message, setMessage] = useState();
    let stt  = 1;
    useEffect(() => {
        axios.get('/api-kind/')
        .then(
            res => {    
                console.log(res.data.kind);
                setKinds(res.data.kind);
            }
        )
    },[])

    
    let show_item_after_delete = ()=>{
        setTimeout(()=>{
          axios.get(`/api-kind`).then(res=>{
            setKinds(res.data.kind)

        })
        },100)
      }

    let Remove = (id) =>{
      if(window.confirm("Bạn chắc chắn muốn xóa thể loaị này")){
        axios.delete(`/api-kind/delete/${id}`)
        .then(
            res => {
                console.log(res.data.message)
                if(res.data.message == 'Đã xóa thành công'){
                    toast.success(res.data.message)
                    show_item_after_delete();
                }else{
                    toast.error(res.data.message)
                }
            }
        )
      }
    }

    const add = () => {
      history.push(`${props.path}/kinds/add`)
    }

  return  (
    <div>
      <div className="card-header">
        <h3>Danh sách thể loại</h3>
        <button onClick={add}>Thêm</button>
      </div>
      
      <div className="card-body">
      <div className="table-responsive">
        <table width="100%">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên thể loại</th>
                <th>Edit</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {kinds.map( (item , index) => (
                <tr key={index}>
                  <td>{stt++}</td>
                  <td>
                      {item.name}
                  </td>
                 
                  <td>
                      <Link to={`${props.path}/kinds/edit/${item._id}`}><BsPencil/></Link>
                  </td>
                  <td>
                      <a onClick={() => Remove(item._id)}><BsTrashFill color="red"/></a>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    </div>
  </div>)
}
