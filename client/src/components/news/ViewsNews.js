import React, { useEffect, useState } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';

export default function Views(props){
    const [news, setNews] = useState([]);
    const [error, setError] = useState();
    useEffect(()=>{
        console.log(props.match.params.id)
        // const res =  await axios.get(`/api-news/views-news/${props.match.params.id}`,
        // {
        //     id: props.match.params.id
        // })
        // if(res){
        //     console.log(res.data.arrNews)
        //     setNews(res.data.arrNews);       
        // }else{
        //     setError("Không tìm thấy")
        // }

        axios.post(`/api-news/views-news/${props.match.params.id}`,
        {
            id: props.match.params.id
        })
        .then(
            res => {
                console.log(res.data.arrNews)
                setNews(res.data.arrNews)
            }
        )

    },'')

    // const views = () => {
    //     console.log(news)
    //     return(
    //         <div>{news._id}</div>
    //     )
    // }
    return (
        <div className="create-user-wrapper">
            {news.content ?  parse(news.content) : null}
        </div>
    )
}