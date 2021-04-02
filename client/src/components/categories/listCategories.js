import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import { BsTrashFill } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";


export default function ListCategories(props){
    let history = useHistory();
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState();
    let stt  = 1;
    useEffect(() => {
        axios.get('/api-categories')
        .then(
            res => {    
                console.log(res.data.categories);
                setCategories(res.data.categories);
            }
        )
    },[])

    
    let show_item_after_delete=()=>{
        setTimeout(()=>{
          axios.get(`/api-categories`).then(res=>{
            console.log(res.data.categories)
            setCategories(res.data.categories)

        })
        },100)
      }

    let Remove = async (id) =>{
        const res = await axios.delete(`/api-categories/delete/${id}`)
        if(res.data.message == "Đã xóa thành công"){
          setMessage(res.data.message)
          show_item_after_delete();
        }else{
          setMessage(res.data.message)
        }
        
    }

    const add = () => {
      history.push(`${props.path}/categories/add`)
    }

  return  (
    <div>
      <div className="card-header">
        <h3>Danh sách chuyên mục</h3>
        <button onClick={add}>See all <span class="las la-arrow-right"></span></button>
      </div>
      
      <div className="card-body">
      <div className="table-responsive">
        <table width="100%">
            <thead>
              <tr>
                <th>STT</th>
                <th>Chuyên mục đăng</th>
                <th>Edit</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {categories.map( (item , index) => (
                <tr key={index}>
                  <td>{stt++}</td>
                  <td>
                      {item.name}
                  </td>
                  <td>
                      <Link to={`${props.path}/categories/edit/${item._id}`}><BsPencil/></Link>
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
