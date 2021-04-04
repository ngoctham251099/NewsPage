import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import { BsTrashFill } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";

import { useHistory, Link } from 'react-router-dom';

function ListNews(props){
    let history = useHistory();
    const [news , setNews] = useState([]);
    const [images, setImages] = useState();
    const[view, setView] = useState();
    const [count, setCount] = useState();
    const [message, setMessage] = useState();
    let stt=1;
    let d=0;
    useEffect(() => {
        axios.get('/api-news/')
        .then(
            res => {
               setNews(res.data.page);
               setImages(res.data.images)
            }
        )
    },[])

    const getStatus = (power) => {
        switch (power) {
            case "1":
                return "Chờ phê duyệt";
                break;
            case "2":
                return "Đã xác nhận";
                break;
            case "3":
                return "Đã phê duyệt";
                break;
            case "4":
                return "Đăng tin";
                break;
            case "4":
                return "Từ chối";
                break;
            default:
                break;
        }
    }


    const show_item_after_delete=()=>{
        setTimeout(()=>{
          axios.get(`/api-news`).then(res=>{
            // history.push(`${props.path}/news`)
            setNews(res.data.page);
            setImages(res.data.images)
        })
        },100)
      }

    let Remove = (id) =>{
        axios.delete(`/api-news/remove/${id}`)
        .then(
            res => {
                console.log("ahhsjhjbhjs")
                show_item_after_delete()
            }
        )
        
    }

	return (
		<div>
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
                                <th>Trạng thái</th>
                                <th>Phòng ban</th>
                                <th>Loại tin</th>
                                <th>Views</th>
                                <th>Edit</th>
                                <th>Remove</th>
                                <th></th>
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
                                    {/* <td>{item.images.map(element => (
                                        <img width={400} src={`/api-news/viewFile/${element}`}></img>
                                    ))}</td>					     */}
                                    <td>{getStatus(item.status)}</td>
                                    {/* <td>{item.status}</td> */}
                                    <td>{item.department}</td>
                                    <td>{item.kindNews}</td>
                                    <td><Link to={`${props.path}/news/views/${item._id}`}>Views</Link></td>
                                    <td>
                                        <Link to={`${props.path}/news/${item._id}`}><BsPencil/></Link>
                                    </td>
                                    <td>
                                        <span onClick={() => Remove(item._id) }><BsTrashFill/></span>
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

export default ListNews;