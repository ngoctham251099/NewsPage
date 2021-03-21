import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import moment from 'moment'

export default function ListNewsFromDate(){
  const [news, setNews] = useState();
  const [date, setDate] = useState();

  const onSubmit = async () => {
    const res = await axios.post('/api-news/statisticalFromDate',{
      date: moment(date).format()
    });
    console.log(res.data.newsFromDate)
    setNews(res.data.newsFromDate)
  }

  const onChange = (e) => {
    console.log(e.target.value)
    setDate(e.target.value);
  }
  return(
    <div>
      <h1>List News</h1>
      <input type="date" onChange={onChange}></input>
      <button onClick={onSubmit}>Submit</button>
    </div>
  )
}