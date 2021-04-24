import React from "react";
import { Link } from "react-router-dom";

const CategoryComponent = ({ categories }) => {
  return (
    <div className="col-lg-3 stretch-card grid-margin">
      <div className="card">
        <div className="card-body">
          <h2>Thể Loại</h2>
          <ul className="vertical-menu">
            {categories &&
              categories.map((item, index) => (
                <li>
                  <Link to={`/post-by-category/${item._id}`}>
                    <a href="#">{item.name}</a>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryComponent;
