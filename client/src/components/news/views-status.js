import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { AiOutlineConsoleSql } from 'react-icons/ai';

export default function ViewsStatus(){

  const [news, setNews] = useState();
  const [message, setMessage] = useState();

  useEffect( async () => {
    const listNews = await axios.get('http://localhost:5000/api-news/viewsPower')
    console.log(listNews.data)
    setMessage(listNews.data.message);
    setNews(listNews.data.news)
  },[])

  return (
    <div>
      <h1>List news</h1>
      {message ? (
        <div>{message}</div>
      ):null}

    </div>
  )
}