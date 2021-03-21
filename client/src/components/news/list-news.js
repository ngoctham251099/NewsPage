import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Views from './Views';

function ListNews(){

    const [news , setNews] = useState([]);
    const [images, setImages] = useState();
    const[view, setView] = useState();
    let stt;
    useEffect(() => {
        axios.get('/api-news/')
        .then(
            res => {
               setNews(res.data.page);
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

    const listImages = (item) =>{
        console.log(item)
        item.forEach(element => {   
            //console.log(element)
            <img src={`/api-news/viewFile/${element}`}></img>
        });
    }

    return (
        <div>
            <h1>List News</h1>
            <table>
                <thead>
                    <th>STT</th>
                    <th>Title</th>
                    <th>Avatar</th>
                    <th>Author</th>
                    <th>Date submitted</th>
                    <th>Images</th>
                </thead>
                <tbody>
                    {news.map(item => (
                        <tr key = {item._id}>
                            <td>{stt++}</td>
                            <td>{item.title}</td>
                            <td><img width={400} src={`/api-news/viewFile/${item.avatar}`}></img></td>
                            <td>{item.author}</td>
                            <td>{listImages(item.images)}</td>
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