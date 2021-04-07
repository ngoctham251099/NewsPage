import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import "../Design/css/admin.css";
import "../Design/js/jsAdmin";
import ListUser from "../users/users";
import ListNews from "../news/list-news";
import StatiscalTemplace from "../statistical/statistical";
import ListNewsApproved from "../news/list-news-approved";
import ListNewsWaitingForApproval from "../news/listNewsWaitingForApproval";
import ListDepartment from "../departments/ListDepartment";
import ListKinds from "../kindOfNews/list-kind";
import CreateUser from "../users/create-user";
import UpdateUser from "../users/update-user";
import NewsFromDate from "../news/newsfromDate";
import NewsFromMonth from "../news/newsFromMonth";
import NewsFromYear from "../news/newsFromYear";
import ViewNews from "../news/ViewsNews";
import UpdateDepartment from "../departments/update-department";
import CreateDepartment from "../departments/Create";
import CreateKind from "../kindOfNews/create-kind";
import UpdateKind from "../kindOfNews/update-kind";
import UpdateNews from "../news/edit-news";
import CreateNews from "../news/create";
import axios from "axios";

import ListCategories from "../categories/listCategories";
import CreateCategories from "../categories/Create";
import UpdateCategories from "../categories/update-categories";
import { THU_KY_ROLE } from "../../config/roles";

export default function Admin(props) {
  let history = useHistory();
  const path = "/secretary";

  const [username, setUsername] = useState();

  useEffect(() => {
    const id = localStorage.getItem("idUser");
    axios.post(`/api-user/user-id/${id}`).then((res) => {
      setUsername(res.data.News);
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("idUser");
    localStorage.removeItem("power");
    history.push("/");
  };

  const clickCategories = () => {
    history.push(`${path}/categories`);
  };

  const clickNews = () => {
    history.push(`${path}/news`);
  };

  const clickStatiscal = () => {
    history.push(`${path}/statistical`);
  };

  const clickNewsApproved = () => {
    history.push(`${path}`);
  };

  return (
    <div>
      <input type="checkbox" id="nav-toggle" />
      <div className="sidebar">
        <div className="sidebar-brand">
          <h2>
            <span className="lab la-accusoft"></span>
            <span>Dashboard</span>
          </h2>
        </div>

        <div className="sidebar-menu">
          <ul>
            <li>
              <div
                onClick={clickNewsApproved}
                className={`${
                  props.location.pathname === "/secretary" && "active"
                }`}
              >
                <span className="las la-igloo"></span>
                <span>Danh sách tin chờ đăng</span>
              </div>
            </li>

            <li>
              <div
                onClick={clickCategories}
                className={`${
                  props.location.pathname === "/secretary/categories" &&
                  "active"
                }`}
              >
                <span className="las la-users"></span>
                <span>Chuyên mục đăng</span>
              </div>
            </li>

            <li>
              <div
                onClick={clickStatiscal}
                className={`${
                  props.location.pathname === "/secretary/statistical" &&
                  "active"
                }`}
              >
                <span className="las la-clipboard-list"></span>
                <span>Thống kê</span>
              </div>
            </li>

            <li>
              <div onClick={logout} className="nav__link ">
                <span className="las la-igloo"></span>
                <span>Đăng xuất</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="main-content">
        <header>
          <h2>
            <label for="nav-toggle">
              <span className="las la-bars"></span>
            </label>
          </h2>

          <div className="user-wrapper">
            <div>
              <h4>{username ? username.username : null}</h4>
            </div>
          </div>
        </header>

        <main>
          <Switch>
            <Route path={`${path}/statistical`}>
              <StatiscalTemplace path={path} currentPath={props.location.pathname}></StatiscalTemplace>
            </Route>
          </Switch>
          <div className="recent-grid">
            <div className="projects">
              <div className="card">
                <Switch>
                <Route
                    path={`${path}/news-waiting-for-approval`}
                    component={ListNewsWaitingForApproval}
                  />
                  <Route path={`${path}/statistical/author`}>
                    <NewsFromDate path={`${path}/statistical/author`}></NewsFromDate>
                  </Route>

                  <Route path={`${path}/statistical/kind`}>
                    <NewsFromMonth path={`${path}/statistical/kind`}></NewsFromMonth>
                  </Route>
                  <Route path={`${path}/statistical/department`}>
                    <NewsFromYear path={`${path}/statistical/department`} />
                  </Route>

                  <Route path={`${path}/users/add`} component={CreateUser} />
                  <Route
                    path={`${path}/users/edit/:id`}
                    component={UpdateUser}
                  />
                  <Route path={`${path}/users`} component={ListUser} />
                  <Route
                    path={`${path}/departments/edit/:id`}
                    key={props.location.key}
                    render={({ match }) => (
                      <UpdateDepartment
                        key={props.location.key}
                        match={match}
                        path={path}
                      />
                    )}
                  ></Route>
                  <Route path={`${path}/departments/add`}>
                    <CreateDepartment></CreateDepartment>
                  </Route>
                  <Route path={`${path}/departments`}>
                    <ListDepartment path={path}></ListDepartment>
                  </Route>

                  <Route
                    path={`${path}/categories/edit/:id`}
                    key={props.location.key}
                    render={({ match }) => (
                      <UpdateCategories
                        key={props.location.key}
                        match={match}
                        path={path}
                      />
                    )}
                  ></Route>
                  <Route path={`${path}/categories/add`}>
                    <CreateCategories />
                  </Route>
                  <Route path={`${path}/categories`}>
                    <ListCategories path={path} />
                  </Route>

                  <Route path={`${path}/news/add`}>
                    <CreateNews path={path} role={THU_KY_ROLE}></CreateNews>
                  </Route>

                  <Route
                    path={`${path}/news/views/:id`}
                    key={props.location.key}
                    render={({ match }) => (
                      <ViewNews
                        key={props.location.key}
                        match={match}
                        path={path}
                      />
                    )}
                  ></Route>

                  <Route
                    path={`${path}/news/:id`}
                    key={props.location.key}
                    render={({ match }) => (
                      <UpdateNews
                        key={props.location.key}
                        match={match}
                        path={path}
                        role={THU_KY_ROLE}
                      />
                    )}
                  ></Route>

                  {/* <Route path={`${path}/news`}>
                    <ListNews path={path}></ListNews>
                  </Route> */}

                  <Route
                    path={`${path}/kinds/edit/:id`}
                    key={props.location.key}
                    render={({ match }) => (
                      <UpdateKind
                        key={props.location.key}
                        match={match}
                        path={path}
                      />
                    )}
                  ></Route>
                  <Route path={`${path}/kinds/add`}>
                    <CreateKind></CreateKind>
                  </Route>

                  <Route path={`${path}/kinds`}>
                    <ListKinds path={path}></ListKinds>
                  </Route>

                  <Route path={`${path}`} component={ListNewsApproved}>
                    <ListNewsApproved path={path} />
                  </Route>
                  
                </Switch>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
