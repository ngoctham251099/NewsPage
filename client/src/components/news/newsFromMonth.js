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
  let counted = [];

  let obj = {}

  const onSubmit = async (props) => {
    const res = await axios.post('/api-news/statisticalFromMonth',{
      fromMonth: selectedDate
    });
    // console.log(res.data.NewMonth)
    // await setNews(res.data.NewMonth)
    if(res.data.NewMonth) {
      let arrStatus = res.data.NewMonth.filter(item => item.status == "3")

      let arrMap = arrStatus.map(item =>{
        obj = item.department;
        return obj;
      })
    
      for(let c of arrMap){
        const alreadyCounted = counted.map(c => c.name);
    
        if (alreadyCounted.includes(c) ) {
          counted[alreadyCounted.indexOf(c)].count += 1
        } else {
          counted.push({ 'name': c, 'count': 1})
        }
      }
      console.log(counted);
      setNews(counted)
    }
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
          <h2>Danh sách bài viết</h2>
          <br></br>
          <table width="100%">
              <thead>
                  <tr>
                      <th>STT</th>
                      <th>Phòng ban</th>
                      <th>Số lượng tin </th>
                      {/* <th>Ngày viết</th>
                      <th>Trạng thái</th>
                      <th>Phòng ban</th> */}
                  </tr>
              </thead>
              <tbody>
                  {news ? (
                    news.map(item => (
                      <tr key = {item._id}>
                          <td>{stt++}</td>
                          <td>{item.name}</td>
                          <td>{item.count}</td>
                          {/* <td>{item.author}</td>
                          <td><Moment format="DD/MM/YYYY">{item.date_submitted}</Moment></td>			     
                          <td>{item.status === "1" ? "Cho phe duyet": "Da Phe duyet"}</td>
                          <td>{item.department}</td> */}
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