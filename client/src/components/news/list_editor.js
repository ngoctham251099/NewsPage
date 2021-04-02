import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link, Prompt} from "react-router-dom";
import { useHistory } from "react-router-dom";
import Moment from "react-moment";
import { BsPencil } from "react-icons/bs";
import Button from "../UI/button-add";
import Select from "../UI/select";
export default function ListEditor(props){
    let history = useHistory();
    let stt = 1;

    const [success , setSuccess] = useState();
    const [error, setError] = useState();
    const [listKind, setListKind] = useState([]);
    const [kind, setKind] = useState();
    const [checked, setChecked] = useState(false);

    const [news, setNews] = useState([]);
    const [message, setMessage] = useState();
  useEffect( async()=>{
    const id = localStorage.getItem('idUser');
    const res  = await axios.get(`/api-news/views-editor?id=${id}`, {
        id: localStorage.getItem('idUSer')
    });
    console.log(res.data.listNews);
    if(res.data.listNews){
        setNews(res.data.listNews)
    }else{
        setMessage(res.data.message);
    }
    
  },[])

  useEffect(() => {
    axios.get('/api-kind')
    .then(
      res => {
        console.log(res.data.kind)
        setListKind(res.data.kind)
      }
    )
  },[])

    const getStatus = (power) => {
        switch (power) {
            case "1":
                return "Chờ phê duyệt";
                // break;
            case "2":
                return "Đã xác nhận";
                // break;
            case "3":
                return "Đã phê duyệt";
                // break;
            case "4":
                return "Từ chối";
                // break;
            default:
                break;
        }
    }


    const updateStatus = async (idNews) => {
        const id = localStorage.getItem('idUser');
        const res = await axios.post(`/api-news/update-status/${id}/${idNews}`,{
            kind: kind
        })
        if(res.data.message == "Đã duyệt tin"){
            console.log(res.data.message)
            setSuccess(res.data.message);
            history.push(`${props.path}`)   
        }else{
            setError(res.data.message);
        }
    }

    const updateRefuse = async (idNews) => {
        const id = localStorage.getItem('idUser');
        const res = await axios.post(`/api-news/update-refuse/${id}/${idNews}`,{
            kind: kind
        })
        if(res.data.message == "Đã từ chối duyệt tin"){
            setSuccess(res.data.message);
            console.log("shygfjdsj")
            history.push(`${props.path}/`)
        }else{
            setError(res.data.message);
        }
    }



    // let show_item_after_delete=()=>{
    //     setTimeout(()=>{
    //         console.log(success);                                           
    //     },100)
        
    //   }

    const onChangeKind = e => {
      console.log(e.target.value)
        setKind(e.target.value);
    }


  return (
    <div>
        {/* <Prompt message="Are you sure you want to leave?" /> : null} */}

      <div className="card-header">
          <h3>Recent Projects</h3>
          <button onClick={()=>{
              history.push(`${props.path}/news/add`)
          }}>Thêm <span class="las la-arrow-right"></span></button>
      </div>
      <div className="card-body">
          <div className="table-responsive">
              <table width="100%">
                  <thead>
                      <tr>
                          <th>STT</th>
                          <th>Tiêu đề</th>
                          <th>Avatar</th>
                          <th>Tác giả</th>
                          <th>Ngày viết</th>
                          <th>Phòng ban</th>
                          <th>Loại tin</th>
                          <th>Views</th>
                          <th>Edit</th>
                          <th>Phê duyệt</th>
                          <th>Từ chối</th>
                      </tr>
                  </thead>
                  <tbody>
                      {news.map(item => (
                          <tr key = {item._id}>
                              <td>{stt++}</td>
                              <td>{item.title}</td>
                              <td><img width={150} src={`/api-news/viewFile/${item.avatar}`}></img></td>
                              <td>{item.author}</td>
                              <td><Moment format="DD/MM/YYYY">{item.date_submitted}</Moment></td>
                              {/* <td>{getStatus(item.status)}</td> */}
                              {/* <td>{item.status}</td> */}
                              <td>{item.department}</td>
                              <td>
                                <Select list={listKind} onChange={onChangeKind}></Select>
                              </td>
                              <td><Link to={`${props.path}/news/views/${item._id}`}>Views</Link></td>
                              <td>
                                  <Link to={`${props.path}/news/${item._id}`}><BsPencil/></Link>
                              </td>
                              <td>
                                  <Button title={getStatus(item.status)} onClick={()=>updateStatus(item._id)} ></Button>
                              </td>
                              <td>
                                  <Button title="Từ chối" onClick={()=>updateRefuse(item._id)} ></Button>
                              </td>
                              <td></td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  )
}