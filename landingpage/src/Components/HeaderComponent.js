import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HeaderComponent = ({ categories }) => {
 
  return (
    <header id="header">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="navbar-bottom pt-4">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <a className="navbar-brand" href="#">
                  <img src="assets/images/logo.png" alt="" />
                </a>
              </div>
              <div>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="navbar-collapse justify-content-center collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav d-lg-flex justify-content-between align-items-center">
                    <li>
                      <button className="navbar-close">
                        <i className="mdi mdi-close"></i>
                      </button>
                    </li>
                    <li className="nav-item active">
                      <a className="nav-link" href="index.html">
                        Trang chủ
                      </a>
                    </li>

                    {categories &&
                      categories.map((item, index) => (
                        <li className="nav-item" key={index}>
                          <Link to={`/post-by-category/${item._id}`}>
                            <a className="nav-link" href="javascript:void(0);">
                        {item.name}
                            </a>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              <ul className="social-media">
                <li>
                  <a href="https://www.facebook.com/thongtintruyenthongangiang/" target="_blank" rel="noreferrer">
                    <i className="mdi mdi-facebook"></i>
                  </a>
                </li>  
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default HeaderComponent;
