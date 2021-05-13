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
import StatiscalTemplace from "../statistical/statistical";
import ListNewsApproved from "../news/list-news-approved";
import ListNewsWaitingForApproval from "../news/listNewsWaitingForApproval";
import ListDepartment from "../departments/ListDepartment";
import ListKinds from "../kindOfNews/list-kind";
import ListNewsPost from "../news/list-news-post-TK.";
import CreateUser from "../users/create-user";
import ReportNews from "../news/list-new-author";
import NewsFromMonth from "../news/list-new-author 2";
import NewsFromYear from "../news/newsFromYear";
import ViewNews from "../news/ViewsNews";
import UpdateDepartment from "../departments/update-department";
import CreateDepartment from "../departments/Create";
import CreateKind from "../kindOfNews/create-kind";
import UpdateKind from "../kindOfNews/update-kind";
import UpdateNews from "../news/edit-news";
import CreateNews from "../news/create";
import axios from "axios";
import user from "../images/user.png";
import UpdateUser from "../users/update-info-user"

import ListCategories from "../categories/listCategories";
import CreateCategories from "../categories/Create";
import UpdateCategories from "../categories/update-categories";
import { THU_KY_ROLE } from "../../config/roles";
import ListWriter from "../news/list_writer";
import { AiOutlineOrderedList, AiFillInfoCircle } from "react-icons/ai";
import Page404 from "./page 404";

export default function Admin(props) {
  let history = useHistory();
  const path = "/secretary";

  const [username, setUsername] = useState();

  useEffect(() => {
    const id = localStorage.getItem("idUser");
    axios.post(`/api-user/user-id/${id}`).then((res) => {
      setUsername(res.data.user);
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("idUser");
    localStorage.removeItem("power");
    history.push("/");
  };

  const clickStatiscal = () => {
    history.push(`${path}/statistical`);
  };

  const clickNewsApproved = () => {
    history.push(`${path}`);
  };

  const onClickListWriter = () => {
    history.push(`${path}/list-writer`);
  };

  const onClickListNewsPost = () => {
    history.push(`${path}/list-news-post`);
  };

  const onClickInfoUser = () => {
    const id = localStorage.getItem('idUser')
    history.push(`${path}/info-user/${id}`);
  };

  return (
    localStorage.getItem('power') === "5" ?
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
                onClick={onClickListNewsPost}
                className={`${
                  props.location.pathname === "/secretary/list-news-post" &&
                  "active"
                }`}
              >
                <span className="las la-users"></span>
                <span>Danh sách tin đã đăng</span>
              </div>
            </li>

            <li>
              <div onClick={onClickListWriter}
               className={`${
                props.location.pathname === "/secretary/list-writer" &&
                "active"
              }`}>
                <span>
                <AiOutlineOrderedList />
                </span>
                <span>Bài viết cá nhân</span>
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
              <div
                onClick={onClickInfoUser}
                className={`nav__link a ${
                  props.location.pathname === `${path}/info-user/${localStorage.getItem('idUser')}` && "active"
                }`}
              >
                <span> <AiFillInfoCircle/></span>
                <span>Thay đổi thông tin tài khoản</span>
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
          <img src={user} width="40px" height="40px" alt="" />
            <div className="user-wrapper">
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
                  <Route path={`${path}/statistical/author`}>
                    <ReportNews path={`${path}/statistical/author`}></ReportNews>
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

                  <Route path={`${path}/list-news-post`}>
                    <ListNewsPost path={path}/>
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

                  <Route path={`${path}/list-writer`}>
                    <ListWriter  path={path} />
                  </Route> 

                  <Route exact path={`${path}`} component={ListNewsApproved}>
                    <ListNewsApproved path={path} />
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
