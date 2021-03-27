import React from 'react';
import {Link, useHistory} from "react-router-dom";

export default function Statiscal(){
  let history = useHistory();
  const LinkDate = () => {
    history.push('/admin/statistical/date')
  }
  return(
    <div className="cards">
      <div class="card-single">
          <div onClick={LinkDate}>
              <h1>Ngày</h1>
          </div>
          <div>
              <span class="las la-users"></span>
          </div>
      </div>
      <div class="card-single">
          <div>
              <h1>Tháng</h1>
          </div>
          <div>
              <span class="las la-clipboard"></span>
          </div>
      </div>
      <div class="card-single">
          <div>
              <h1>Năm</h1>
          </div>
          <div>
              <span class="las la-clipboard-list"></span>
          </div>
      </div>
      <div class="card-single">
          <div>
              <h1>$6k</h1>
              <span>Income</span>
          </div>
          <div>
              <span class="las la-google-wallet"></span>
          </div>
      </div>
    </div>
  )
}