import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'react-moment';

export default function ListNewsWaitingForApproval(){

    const [news , setNews] = useState([]);
    const [images, setImages] = useState();
    const[view, setView] = useState();
    const [count, setCount] = useState();
    let stt=1;
    let d=0;
    useEffect(() => {
        axios.get('http://3.130.135.8/api/api-news/list-news-waiting-for-approval')
        .then(
            res => {
              console.log(res.data)
              setNews(res.data.listNewsApproved);
              setImages(res.data.images)
            }
        )
    },[])

    const ViewsId = (id) => {
        axios.post(`http://3.130.135.8/api/api-news/view/${id}`)
        .then(
            res => {
                if(res.data){
                    setView(true);
                }else{}
                    
            }
        )
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
                        <th>Avatar</th>
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
                            <td><img width={150} src={`/api-news/viewFile/${item.avatar}`}></img></td>
                            <td>{item.author}</td>
                            <td><Moment format="DD/MM/YYYY">{item.date_submitted}</Moment></td>
                            {/* <td>{item.images.map(element => (
                                <img width={400} src={`/api-news/viewFile/${element}`}></img>
                            ))}</td>					     */}
                            <td>{item.status === "1" ? "Cho phe duyet": "Da Phe duyet"}</td>
                            <td>{item.department}</td>
                            <td><button onClick={() => ViewsId(item._id)}>View</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
				</div>
			</div>
		</div>
	)
}
