import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import { BsTrashFill } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";

export default function ListKinds(props){
    let history = useHistory();
    const [images, setImages] = useState([]);
    const [message, setMessage] = useState();
    let stt  = 1;
    useEffect(() => {
        axios.get('/api-images/')
        .then(
            res => {    
                console.log(res.data.images);
                setImages(res.data.images);
            }
        )
    },[])

    
    let show_item_after_delete = ()=>{
        setTimeout(()=>{
          axios.get(`/api-images`).then(res=>{
            setImages(res.data.images)

        })
        },100)
      }

    let Remove = (id) =>{
        axios.delete(`/api-images/delete/${id}`)
        .then(
            res => {
                console.log(res.data.message)
                if(res.data.message == 'Đã xóa thành công'){
                    setMessage(res.data.message)
                    show_item_after_delete();
                }else{
                    setMessage(res.data.message)
                }
            }
        )

       
    }

    const add = () => {
      history.push(`${props.path}/list-images/add`)
    }

  return  (
    <div>
      <div className="card-header">
        <h3>Danh sách phòng ban</h3>
        <button onClick={add}>Thêm <span class="las la-arrow-right"></span></button>
      </div>
      
      <div className="card-body">
      <div className="table-responsive">
        <table width="100%">
            <thead>
              <tr>
                <th>STT</th>
                <th>Đuôi hình ảnh</th>
                <th>Đơn giá</th>
                <th>Edit</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              { images.map( (item , index) => (
                <tr key={index}>
                  <td>{stt++}</td>
                  <td>
                      {item.name}
                  </td>
                  <td>
                      {item.price}
                  </td>
                  <td>
                      <Link to={`${props.path}/list-images/edit/${item._id}`}><BsPencil/></Link>
                  </td>
                  <td>
                      <button onClick={() => Remove(item._id)}><BsTrashFill/></button>
                  </td>
                  <td>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    </div>
  </div>)
}
