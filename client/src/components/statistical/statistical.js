import React from "react";
import { useHistory } from "react-router-dom";

export default function Statiscal(props) {
  console.log(props);
  let history = useHistory();

  const LinkDate = () => {
    history.push(`${props.path}/statistical/author`);
  };

  const LinkMonth = () => {
    history.push(`${props.path}/statistical/kind`);
  };

  const LinkYear = () => {
    history.push(`${props.path}/statistical/department`);
  };

  return (
    <div className="recent-grid">
      <div className="cards">
        <div className={`card-single ${props.currentPath === '/admin/statistical/author' && 'card-active'}`}>
          <div onClick={LinkDate}>
            <h4>Thống kê theo tác giả</h4>
          </div>
          <div>
            <span className="las la-users"></span>
          </div>
        </div>
        <div onClick={LinkMonth} className={`card-single ${props.currentPath === '/admin/statistical/kind' && 'card-active'}`}>
          <div>
            <h4>Thống kê theo loại tin</h4>
          </div>
          <div>
            <span className="las la-clipboard"></span>
          </div>
        </div>
        <div onClick={LinkYear} className={`card-single ${props.currentPath === '/admin/statistical/department' && 'card-active'}`}>
          <div>
            <h4>Thống kê theo phòng ban</h4>
          </div>
          <div>
            <span className="las la-clipboard-list"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
