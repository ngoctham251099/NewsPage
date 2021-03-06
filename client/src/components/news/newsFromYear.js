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
  const [selectedYear, setSelectedYear] = React.useState();
  const [countAll, setCountAll] = useState(0);
  const [countWaitingApproval, setCountWaitingApproval] = useState(0);
  const [countConfirmed, setCountConfirmed] = useState(0);
  const [countApproval, setCountApproval] = useState(0);
  const [refuse , setRefuse] = useState(0);

  let stt = 1;
  let count= 0;

  const onSubmit = async (props) => {
    const res = await axios.post('/api-news/statisticalFromYear',{
      year: `01-01-${selectedYear}`
    });
    await setNews(res.data.NewMonth)
    res.data.NewMonth.forEach(element => {
      count++;
    });
    setCountAll(count);

    const arr = res.data.NewMonth.filter(item =>{
        return item.status == "1";
    })
    count = 0;
    arr.forEach(item => {
      count++;
    })
    setCountWaitingApproval(count)
    //--------------
    const arr1 = res.data.NewMonth.filter(item =>{
      return item.status == "2";
    })
    count = 0;
    arr1.forEach(item => {
      count++;
    })
    setCountConfirmed(count)
    //-------------------
    const arr2 = res.data.NewMonth.filter(item =>{
      return item.status == "3";
    })
    count = 0;
    arr2.forEach(item => {
      count++;
    })
    setCountApproval(count)

    //-----------------
    const arr3 = res.data.NewMonth.filter(item =>{
      return item.status == "3";
    })
    count = 0;
    arr3.forEach(item => {
      count++;
    })
    setRefuse(count)

  }
  useEffect(()=> {
    const listYear = () => {
      let currentYear = new Date().getFullYear()
      let max = currentYear + 10;
      var option = "";
      for (var year = currentYear-10 ; year <= max; year++) {
        
          var option = document.createElement("option");
          option.text = year;
          option.value = year;
          
          document.getElementById("year").appendChild(option)
          
      }
     // document.getElementById("year").value = currentYear;
    }
    listYear();
  })

  const handleYearChange = (e) => {
    console.log(e.target.value)
    setSelectedYear(e.target.value);
  };

  return(
    <div>
      {/* <DateFrom handleDateChange={handleDateChange} selectedDate={selectedDate}></DateFrom> */}
      <Button onClick={onSubmit} title="Th???ng k??"></Button>
      
      {/* <Select month ={month}></Select> */}
      <select id="year" onChange={handleYearChange}></select>

      <div className="card-body">
				<div className="table-responsive">
          <h2>S??? l?????ng b??i vi???t</h2>
          <br></br>
          <table width="100%">
            <thead>
              <tr>
                <th>T???ng s??? l?????ng tin</th>
                <th>S??? tin ch??? ph?? duy???t</th>
                <th>S??? tin ???? ???????c x??c nh???n</th>
                <th>S??? tin ???? ph?? duy???t</th>
                <th>S??? tin ???? ph?? duy???t</th>
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
          <h2>Danh s??ch b??i vi???t</h2>
          <br></br>
          <table width="100%">
              <thead>
                  <tr>
                      <th>STT</th>
                      <th>Ti??u ?????</th>
                      <th>T??c gi???</th>
                      <th>Ng??y vi???t</th>
                      <th>Tr???ng th??i</th>
                      <th>Ph??ng ban</th>
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