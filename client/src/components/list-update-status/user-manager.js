import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'react-moment';

function ListNews(){

    const [news , setNews] = useState([]);
    const [images, setImages] = useState();
    const[view, setView] = useState();
    const [count, setCount] = useState();
    let stt=0;
    let d=0;
    useEffect(() => {

        axios.get(`http://localhost:5000/api-news/views-department?id=${localStorage.getItem('idUser')}`,{id: localStorage.getItem('idUser')})
        .then(
            res => {
               setNews(res.data.listNews);
               setImages(res.data.images)
            }
        )
    },[])

    const ViewsId = (id) => {
        axios.post(`http://localhost:5000/api-news/view/${id}`)
        .then(
            res => {
                if(res.data){
                    setView(true);
                }else{}
                    
            }
        )
    }

    // useEffect(()=>{
    //     const countNews = () =>{
    //         news.forEach( item => {
    //             d++;
    //         })
    //         setCount(d);

    //         let list = news.filter((elem, index, seft) => {

    //             seft.findIndex(
    //                 t => {return (t.author == elem.author ) === index}
    //             )
    //         })  
    //         console.log(list)  

    //         // list = list.filter((elem, index, self) => self.findIndex(
    //         //     (t) => {return (t.x === elem.x && t.y === elem.y)}) === index)
    //     }
    //     countNews()
    // },[])


    return (
        <div>
            <h1>List News</h1>
            <div>
                <label>So luong</label>
                <h6>{count}</h6>
            </div>
            <table>
                <thead>
                    <th>STT</th>
                    <th>Title</th>
                    <th>Avatar</th>
                    <th>Author</th>
                    <th>Date submitted</th>
                    <th>Images</th>
                    <th>Status</th>
                    <th>Department</th>
                </thead>
                <tbody>
                    {news.map(item => (
                        <tr key = {item._id}>
                          <td>{stt++}</td>
                            <td>{item.title}</td>
                            <td><img width={400} src={`/api-news/viewFile/${item.avatar}`}></img></td>
                            <td>{item.author}</td>
                            <td><Moment format="DD/MM/YYYY">{item.date_submitted}</Moment></td>
                            <td>{item.images.map(element => (
                                <img width={400} src={`/api-news/viewFile/${element}`}></img>
                            ))}</td>
                            {/* <td>{moment(item.date_submitted).format('L')}</td> */}
						    
                            <td>{item.status === "1" ? "Cho phe duyet": "Da Phe duyet"}</td>
                            <td>{item.department}</td>
                            <td><button onClick={() => ViewsId(item._id)}>View</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListNews;