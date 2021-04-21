import React from 'react';

const HeaderComponent = () => {
  return (
    <header id="header">
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light">
              <div className="navbar-bottom pt-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <a className="navbar-brand" href="#">
                      <img src="assets/images/logo.svg" alt="" />
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
                            Home
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="pages/magazine.html">
                            MAGAZINE
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="pages/business.html">
                            Business
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="pages/sports.html">
                            Sports
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="pages/art.html">
                            Art
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="pages/politics.html">
                            POLITICS
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="pages/travel.html">
                            Travel
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="pages/contactus.html">
                            Contact
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <ul className="social-media">
                    <li>
                      <a href="#">
                        <i className="mdi mdi-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="mdi mdi-youtube"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="mdi mdi-twitter"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </header>
  )
}

export default HeaderComponent
