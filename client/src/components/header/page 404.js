import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from "../UI/button-add";

export default function Page404(){
  let history = useHistory();
  return(
    <div>
      <div className="NotFound" style={{
      textAlign: "center",
      fontSize: "2.5rem"
      }}>
        <span>Không được phép truy cập</span>
        <div >
        <Button onClick={() => history.goBack()} title = "Trở lại"></Button>
        </div>
      </div>
    </div>
  )
}