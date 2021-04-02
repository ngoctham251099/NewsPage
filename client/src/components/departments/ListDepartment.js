import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import { BsTrashFill } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";


function ListDepatment(props){
    let history = useHistory();
    const [departments, setDepartments] = useState([]);
    const [message, setMessage] = useState();
    let stt  = 1;
    useEffect(() => {
        axios.get('/api-department')
        .then(
            res => {    
                console.log(res.data.department);
                setDepartments(res.data.department);
            }
        )
    },[])

    
    let show_item_after_delete=()=>{
        setTimeout(()=>{
          axios.get(`/api-department`).then(res=>{
            console.log(res.data.department)
            setDepartments(res.data.department)

        })
        },100)
      }

    let Remove = async (id) =>{
        const res = await axios.delete(`/api-department/delete/${id}`)
        if(res.data.message == "Đã xóa thành công"){
          setMessage(res.data.message)
          show_item_after_delete();
        }else{
          setMessage(res.data.message)
        }
        
    }

    const add = () => {
      history.push(`${props.path}/departments/add`)
    }

  return  (
    <div>
      <div className="card-header">
        <h3>Danh sách phòng ban</h3>
        <button onClick={add}>See all <span class="las la-arrow-right"></span></button>
      </div>
      
      <div className="card-body">
      <div className="table-responsive">
        <table width="100%">
            <thead>
              <tr>
                <th>STT</th>
                <th>Department</th>
                <th>Edit</th>
                <th>Remove</th>
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

export default ListDepatment;