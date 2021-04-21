import React from "react";

const CategoryComponent = () => {
  return (
    <div className="col-lg-3 stretch-card grid-margin">
      <div className="card">
        <div className="card-body">
          <h2>Category</h2>
          <ul className="vertical-menu">
            <li>
              <a href="#">Politics</a>
            </li>
            <li>
              <a href="#">International</a>
            </li>
            <li>
              <a href="#">Finance</a>
            </li>
            <li>
              <a href="#">Health care</a>
            </li>
            <li>
              <a href="#">Technology</a>
            </li>
            <li>
              <a href="#">Jobs</a>
            </li>
            <li>
              <a href="#">Media</a>
            </li>
            <li>
              <a href="#">Administration</a>
            </li>
            <li>
              <a href="#">Sports</a>
            </li>
            <li>
              <a href="#">Game</a>
            </li>
            <li>
              <a href="#">Art</a>
            </li>
            <li>
              <a href="#">Kids</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryComponent;
