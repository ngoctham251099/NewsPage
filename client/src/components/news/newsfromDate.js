import 'date-fns';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Button from '../UI/button-add';
import Moment from 'react-moment';
import DateFrom from '../UI/date';
//------------DATE-------------

export default function ListNewsFromDate(){
  const [news, setNews] = useState([]);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const [selectedtoDate, setSelectedtoDate] = React.useState(new Date());
  const [selectedFromDate, setSelectedFromDate] = React.useState(new Date());

  let stt = 1;
  let count= 0;

  useEffect(async (props) => {
    const res = await axios.post('/api-news/statisticalFromDate',{
      date: selectedDate
    });
    console.log(res.data.newsFromDate)
    if(res.data.newsFromDate){
      console.log("sjdjfsk")
      let arr = res.data.newsFromDate.filter( item => {
        return item.status == '3';
      })
      console.log(arr)
      setNews(arr)
     }

  },[])

  const onSubmitDate = async (props) => {
    const res = await axios.post('/api-news/statisticalFromDate',{
      date: selectedDate
    })
   console.log(res.data.newsFromDate)

   if(res.data.newsFromDate){
    console.log("sjdjfsk")
    let arr = res.data.newsFromDate.filter( item => {
      return item.status == '3';
    })
    console.log(arr)
    setNews(arr)
   }

  }

  const onSubmitFromDatetoDate = async () => {
    console.log()
    const res = await axios.post('/api-news/statisticalFromDateToDate',{
      fromDate: selectedFromDate,
      toDate: selectedtoDate
    });
    console.log(res.data.News)
    setNews(res.data.News)
  }

  const getStatus = (power) => {
    switch (power) {
        case "1":
            return "Chờ phê duyệt";
            // break;
        case "2":
            return "Đã xác nhận";
            // break;
        case "3":
            return "Đã phê duyệt";
            // break;
        case "4":
            return "Từ chối";
            // break;
        default:
            break;
    }
  }


  const onChangeFromDate = (date) => {
    setSelectedFromDate (date);
  }
  const onChangeToDate = (date) => {
    setSelectedtoDate(date)
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  return(
    <div>
      <table width="100%">
        <tr>
          <td width="20%">
            <DateFrom handleDateChange={handleDateChange} selectedDate={selectedDate}></DateFrom>
          </td>
          <td>
            <Button onClick={onSubmitDate} title="Thống kê"></Button>
          </td>
        </tr>
        <tr>
          <td>
            <DateFrom handleDateChange={onChangeFromDate} selectedDate={selectedFromDate} ></DateFrom>
          </td>
          <td>
            <DateFrom handleDateChange={onChangeToDate} selectedDate={selectedtoDate}></DateFrom>
          </td>
          <td>
          <Button onClick={onSubmitFromDatetoDate} title="Thống kê"></Button>
          </td>
        </tr>
      </table>
      

      

      <div className="card-body">
				<div className="table-responsive">
          <h2>Danh sách bài viết</h2>
          <br></br>
          <table width="100%">
              <thead>
                  <tr>
                      <th>STT</th>
                      <th>Tiêu đề</th>
                      <th>Bút danh</th>
                      <th>Ngày viết</th>
                      <th>Trạng thái</th>
                      <th>Phòng ban</th>
                  </tr>
              </thead>
              <tbody>
                  {news ? (
                    news.map(item => (
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
                          <td></td>
                      </tr>
                  ))
                  ):null}
              </tbody>
          </table>
				</div>
			</div>
    </div>
  )
}