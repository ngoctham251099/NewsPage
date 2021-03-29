import 'date-fns';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Button from '../UI/button-add';
import Moment from 'react-moment';
import DateFrom from '../UI/date';
import Select from '../UI/select';
//------------DATE-------------

export default function ListNewsFromDate(){
  const [news, setNews] = useState([]);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [countAll, setCountAll] = useState(0);
  const [countWaitingApproval, setCountWaitingApproval] = useState(0);
  const [countConfirmed, setCountConfirmed] = useState(0);
  const [countApproval, setCountApproval] = useState(0);
  const [refuse , setRefuse] = useState(0);

  let stt = 1;
  let count= 0;

  const onSubmit = async (props) => {
    const res = await axios.post('/api-news/statisticalFromMonth',{
      fromMonth: selectedDate
    });
    console.log(res.data.NewMonth)
    await setNews(res.data.NewMonth)
    res.data.NewMonth.forEach(element => {
      count++;
    });
    console.log(count)
    setCountAll(count);

    const arr = res.data.NewMonth.filter(item =>{
        return item.status == "1";
    })
    count = 0;
    arr.forEach(item => {
      count++;
    })
    console.log(count)
    setCountWaitingApproval(count)
    //--------------
    const arr1 = res.data.NewMonth.filter(item =>{
      return item.status == "2";
    })
    count = 0;
    arr1.forEach(item => {
      count++;
    })
    console.log(count)
    setCountConfirmed(count)
    //-------------------
    const arr2 = res.data.NewMonth.filter(item =>{
      return item.status == "3";
    })
    count = 0;
    arr2.forEach(item => {
      count++;
    })
    console.log(count)
    setCountApproval(count)

    //-----------------
    const arr3 = res.data.NewMonth.filter(item =>{
      return item.status == "3";
    })
    count = 0;
    arr3.forEach(item => {
      count++;
    })
    console.log(count)
    setRefuse(count)

  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return(
    <div>
      <DateFrom handleDateChange={handleDateChange} selectedDate={selectedDate}></DateFrom>
      <Button onClick={onSubmit} title="Thống kê"></Button>
      
      {/* <Select month ={month}></Select> */}
      {/* <select>
        {listMonth()}
      </select> */}

      <div className="card-body">
				<div className="table-responsive">
          <h2>Số lượng bài viết</h2>
          <br></br>
          <table width="100%">
            <thead>
              <tr>
                <th>Tổng số lượng tin</th>
                <th>Số tin chờ phê duyệt</th>
                <th>Số tin đã được xác nhận</th>
                <th>Số tin đã phê duyệt</th>
                <th>Số tin đã phê duyệt</th>
              </tr>
            </thead>
            <tbody>
              <td>{countAll != 0 ? countAll : 0}</td>
              <td>{countWaitingApproval != 0 ? countWaitingApproval : 0}</td>
              <td>{countConfirmed != 0 ? countConfirmed : 0}</td>
              <td>{countApproval != 0 ? countApproval : 0}</td>
              <td>{refuse != 0 ? refuse : 0}</td>
            </tbody>
          </table>
          <br></br>
          <h2>Danh sách bài viết</h2>
          <br></br>
          <table width="100%">
              <thead>
                  <tr>
                      <th>STT</th>
                      <th>Tiêu đề</th>
                      <th>Tác giả</th>
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
                          <td><img width={150} src={`/api-news/viewFile/${item.avatar}`}></img></td>
                          <td>{item.author}</td>
                          <td><Moment format="DD/MM/YYYY">{item.date_submitted}</Moment></td>
                          {/* <td>{item.images.map(element => (
                              <img width={400} src={`/api-news/viewFile/${element}`}></img>
                          ))}</td>					     */}
                          <td>{item.status === "1" ? "Cho phe duyet": "Da Phe duyet"}</td>
                          <td>{item.department}</td>
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