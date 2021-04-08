import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import { BsTrashFill } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";
import { toast } from "react-toastify";

export default function ListPriceOfKinds(props){
    let history = useHistory();
    const [kinds, setKinds] = useState([]);
    const [message, setMessage] = useState();
    let stt  = 1;
    useEffect(() => {
        axios.get('/api-price-of-kind')
        .then(
            res => {    
                setKinds(res.data.kind);
            }
        )
    },[])

    
    let show_item_after_delete = ()=>{
      setTimeout(()=>{
        axios.get(`/api-price-of-kind`).then(res=>{
          setKinds(res.data.kind)
      })
      },100)
    }

    let Remove = (id) =>{
        axios.delete(`/api-price-of-kind/delete/${id}`)
        .then(
            res => {
                if(res.data.message == 'Đã xóa thành công'){
        toast.success(res.data.message);
                   show_item_after_delete();
        
                }else{
        toast.success(res.data.message);
                    
                }
            }
        )

       
    }

    const add = () => {
      history.push(`${props.path}/price-of-kinds/add`)
    }

  return  (
    <div>
      <div className="card-header">
        <h3>Danh sách loại tin và đơn giá</h3>
        <button onClick={add}>Thêm</button>
      </div>
      
      <div className="card-body">
      <div className="table-responsive">
        <table width="100%">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên loai</th>
                <th>đơn giá</th>
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
                      {item.price}
                  </td>
                 
                  <td>
                      <Link to={`${props.path}/price-of-kinds/edit/${item._id}`}><BsPencil/></Link>
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
