import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'react-moment';

import Card from "../UI/List"

function ListNews(){

    const [news , setNews] = useState([]);
    const [images, setImages] = useState();
    const[view, setView] = useState();
    const [count, setCount] = useState();
    let stt=1;
    let d=0;
    useEffect(() => {
        axios.get('/api-news/list-news-approved')
        .then(
            res => {
                setNews(res.data.listNewsApproved);
               setImages(res.data.images)
            }
        )
    },[])

    const ViewsId = (id) => {
        axios.post(`/api-news/view/${id}`)
        .then(
            res => {
                if(res.data){
                    setView(true);
                }else{}
                    
            }
        )
    }

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

    useEffect(()=>{
        const countNews = () =>{
            news.forEach( item => {
                d++;
            })
            setCount(d);

            let list = news.filter((elem, index, seft) => {

                seft.findIndex(
                    t => {return (t.author == elem.author ) === index}
                )
            })  
            console.log(list)  

            // list = list.filter((elem, index, self) => self.findIndex(
            //     (t) => {return (t.x === elem.x && t.y === elem.y)}) === index)
        }
        countNews()
    },[])


	return (
		<div>
			<div className="card-header">
				<h3>Recent Projects</h3>
				<button>See all <span class="las la-arrow-right"></span></button>
			</div>
			<div className="card-body">
				<div className="table-responsive">
                    <table width="100%">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tiêu đề</th>
                                <th>Bút danh</th>
                                <th>Ngày viết</th>
                                <th>Trạng thái</th>
                                <th>Phòng ban</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {news.map(item => (
                                <tr key = {item._id}>
                                    <td>{stt++}</td>
                                    <td>{item.title}</td>
                                    <td>{item.author}</td>
                                    <td><Moment format="DD/MM/YYYY">{item.date_submitted}</Moment></td>
                                    {/* <td>{item.images.map(element => (
                                        <img width={400} src={`/api-news/viewFile/${element}`}></img>
                                    ))}</td>					     */}
                                    <td>{getStatus(item.status)}</td>
                                    <td>{item.department}</td>
                                    <td><Link to={`${props.path}/news/views/${item._id}`}>Views</Link></td>
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