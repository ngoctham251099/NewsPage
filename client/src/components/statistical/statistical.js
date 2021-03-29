import React from 'react';
import {Link, useHistory, useLocation} from "react-router-dom";

export default function Statiscal(props){
  let history = useHistory();
  let location = useLocation();
  const LinkDate = () => {
    history.push(`${props.path}/statistical/date`)
  }

  const LinkMonth = () => {
    history.push(`${props.path}/statistical/month`)
  }

  const LinkYear = () => {
    history.push(`${props.path}/statistical/year`)
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
      <div onClick={LinkMonth} class="card-single">
          <div>
              <h1>Tháng</h1>
          </div>
          <div>
              <span class="las la-clipboard"></span>
          </div>
      </div>
      <div onClick={LinkYear} class="card-single">
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