import React, { useEffect, useState } from "react";
import {  Route, Switch, useHistory } from "react-router-dom";
import "../Design/css/admin.css";
import "../Design/js/jsAdmin";
import ListNewsWriter from "../news/list_writer";
import ViewNews from "../news/ViewsNews";
import CreateNews from "../news/create";
import axios from "axios";
import UpdateNews from "../news/edit-news";
import { CTV_ROLE } from "../../config/roles";
import { AiFillInfoCircle } from "react-icons/ai";
import UpdateUser from "../users/update-info-user";
import user from "../images/user.png";
import Page404 from "./page 404";

export default function Admin(props) {
  const path = "/news-writer";
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("idUser");
    localStorage.removeItem("power");
    history.push("/");
  };

  const [username, setUsername] = useState();

  useEffect(() => {
    const id = localStorage.getItem("idUser");
    axios.post(`/api-user/user-id/${id}`).then((res) => {
      setUsername(res.data.News);
    });
  }, []);

  const onClickInfoUser = () => {
    const id = localStorage.getItem('idUser')
    history.push(`${path}/info-user/${id}`);
  };

  return (
    localStorage.getItem('power') === "4" ?
    <div>
      <input type="checkbox" id="nav-toggle" />
      <div class="sidebar">
        <div class="sidebar-brand">
          <h2>
            <span class="lab la-accusoft"></span>
            <span>Dashboard</span>
          </h2>
        </div>

        <div class="sidebar-menu">
          <ul>
            <li>
              <div
                className={`nav__link a ${
                  props.location.pathname === "/news-writer" && "active"
                }`}
                onClick={() => history.push("/news-writer")}
              >
                <span class="las la-clipboard-list"></span>
                <span>Danh sách bài viết</span>
              </div>
            </li>

            <li>
              <div
                onClick={onClickInfoUser}
                className={`nav__link a ${
                  props.location.pathname === "/news-writer/info-user/:id" && "active"
                }`}
              >
                <span><AiFillInfoCircle/></span>
                <span>Thay đổi thông tin tài khoản</span>
              </div>
            </li>

            <li>
              <div onClick={logout} className={`nav__link a`}>
                <span class="las la-igloo"></span>
                <span>Đăng xuất</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="main-content">
        <header>
          <h2>
            <label for="nav-toggle">
              <span class="las la-bars"></span>
            </label>
            Dashboard
          </h2>

          <div class="user-wrapper">
          <img src={user} width="40px" height="40px" alt="" />
            <div>
              <h4>{username ? username.username : null}</h4>
            </div>
          </div>
        </header>

        <main>
          <div class="cards">
            {/* <div class="card-single">
                        <div>
                            <h1>$6k</h1>
                            <span>Income</span>
                        </div>
                        <div>
                            <span class="las la-google-wallet"></span>
                        </div>
                    </div> */}
          </div>

          <div class="recent-grid">
            <div className="projects">
              <div className="card">
                <Switch>
                <Route
                    path={`${path}/info-user/:id`}
                    key={props.location.key}
                    render={({ match }) => (
                      <UpdateUser
                        key={props.location.key}
                        match={match}
                        path={path}
                      />
                    )}
                  ></Route>

                  <Route
                    path={`${path}/news/views/:id`}
                    key={props.location.key}
                    render={({ match }) => (
                      <ViewNews key={props.location.key} match={match} />
                    )}
                  ></Route>


                  <Route path={`${path}/news/add`}>
                    <CreateNews path={path} role={CTV_ROLE} />
                  </Route>

                  <Route
                    path={`${path}/news/:id`}
                    key={props.location.key}
                    render={({ match }) => (
                      <UpdateNews
                        key={props.location.key}
                        match={match}
                        role={CTV_ROLE}
                      />
                    )}
                  ></Route>
                  <Route path={`${path}`}>
                    <ListNewsWriter path={path} />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    : <Page404/>
  );
}
