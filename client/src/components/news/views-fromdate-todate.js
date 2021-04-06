import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';

export default function ListNewsFromDateToDate(){
  const [news, setNews] = useState();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  const onSubmit = async () => {
    const res = await axios.post('/api-news/statisticalFromDateToDate',{
      fromDate: fromDate,
      toDate: toDate
    });
    console.log(res.data.News)
    setNews(res.data.News)
  }

  const onChangeFromDate = (e) => {
    console.log(e.target.value)
    setFromDate(e.target.value);
  }
  const onChangeToDate = (e) => {
    console.log(e.target.value)
    setToDate(e.target.value)
  }
  return(
    <div>
      <h1>List News</h1>
      <input type="date" onChange={onChangeFromDate}></input>
      <input type="date" onChange={onChangeToDate}></input>
      <button onClick={onSubmit}>Submit</button>
    </div>
  )
}