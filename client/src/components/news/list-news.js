import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Views from './Views';

function ListNews(){

    const [news , setNews] = useState([]);
    const [view, setView] = useState();
    let stt = 1;

    useEffect(() => {
        axios.get('/api-news/')
        .then(
            res => {
                console.log(res.data.page)
               setNews(res.data.page);
            }
        )
    },[])

    const ViewsId = (id) => {
        axios.post(`/api-news/view/${id}`)
        .then(
            res => {
                if(res.data){
                    view= true;
                }else{}
                    
            }
        )
    }
    

    return (
        <div>
            <h1>List News</h1>
            <table>
                <thead>
                    <th>STT</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Date submitted</th>
                </thead>
                <tbody>
                    {news.map(item => (
                        <tr>
                            <td>{stt++}</td>
                            <td>{item.title}</td>
                            <td>{item.author}</td>
                            <td>{item.date_submitted}</td>
                            <td>{item.status === "1" ? "Cho phe duyet": "Da Phe duyet"}</td>
                            <td><button onClick={() => ViewsId(item._id)}>View</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListNews;