import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { BsTrashFill } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";


function ListDepatment(props){
    const [departments, setDepartments] = useState([]);
    // const [message, setMessage] = useState();
    let stt  = 1;
    useEffect(() => {
        axios.get('/api-department/index')
        .then(
            res => {    
                console.log(res.data.department);
                setDepartments(res.data.department);
            }
        )
    },[])

    
    let show_item_after_delete=()=>{
        setTimeout(()=>{
          axios.get(`/api-department/index`).then(res=>{
            setDepartments(res.data.department)

        })
        },100)
      }

    let Remove = async (id) =>{
        await axios.delete(`/api-department/delete/${id}`)
        show_item_after_delete();
    }



    return  (
            <div className="list-department">
                <h1 className="title">List department</h1>
                <Link to="/department/add" >Add</Link>
                {/* {message ? (
                    <div>{message}</div>
                ): null} */}
                <table>
                    <thead>
                        <th>STT</th>
                        <th>Department</th>
                        <th>Edit</th>
                        <th>Remove</th>
                    </thead>
                    <tbody>
                    { departments.map( (item , index) => (
                        <tr key={index}>
                        <td>{stt++}</td>
                        <td>
                            {item.name}
                        </td>
                        <td>
                            <Link to={`/department/edit/${item._id}`} className="btn btn-primary"><BsPencil/></Link>
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={() => Remove(item._id)}><BsTrashFill/></button>
                        </td>
                        <td>
                        </td>
                    </tr>
                    ))}
                    </tbody>
                </table>
            </div>
    )
}

export default ListDepatment;