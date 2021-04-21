import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import axios from "axios";

import { AiOutlineTeam } from "react-icons/ai";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BiFoodMenu } from "react-icons/bi";
import { GoChecklist } from "react-icons/go";
import { AiOutlineOrderedList } from "react-icons/ai";
import { BsTable } from "react-icons/bs";
import { AiOutlineLogout, AiFillInfoCircle, AiOutlinePicture } from "react-icons/ai";
import user from "../images/user.png";
import UpdateUsers from "../users/update-info-user";

import "../Design/css/admin.css";
import "../Design/js/jsAdmin";
import ListUser from "../users/users";
import ListNews from "../news/list-news";
import StatiscalTemplace from "../statistical/statistical";
import ListNewsApproved from "../news/list-news-approved";
import ListNewsWaitingForApproval from "../news/listNewsWaitingForApproval";
import ListDepartment from "../departments/ListDepartment";
import ListKinds from "../kindOfNews/list-kind";
import ListPriceOfKind from "../kindOfNews/list-price-of-kind";
import ListNewAuthor from "../news/list-new-author";
import CreateUser from "../users/create-user";
import UpdateUser from "../users/update-user";
import NewsFromMonth from "../news/newsFromMonth";
import NewsFromYear from "../news/newsFromYear";
import ViewNews from "../news/ViewsNews";
import UpdateDepartment from "../departments/update-department";
import CreateDepartment from "../departments/Create";
import CreateKind from "../kindOfNews/create-kind";
import CreatePriceOfKindComponent from "../kindOfNews/CreatePriceOfKindComponent";
import UpdatePriceOfKindComponent from "../kindOfNews/UpdatePriceOfKindComponent";

import UpdateKind from "../kindOfNews/update-kind";
import UpdateNews from "../news/edit-news";
import CreateNews from "../news/create";

import ListCategories from "../categories/listCategories";
import CreateCategories from "../categories/Create";
import UpdateCategories from "../categories/update-categories";

import ListImages from "../images_data/list-images";
import CreateImages from "../images_data/create-images";
import UpdateImages from "../images_data/update-images";

import ListKindImages from "../kindOfImages/ListKindOfImages";
import CreateKindImages from "../kindOfImages/CreateKindOfImages";
import UpdateKindImages from "../kindOfImages/UpdateKindOfImagesComponent";
import Page404 from "./page 404";
import {
  ADMIN_ROLE,
} from "../../config/roles";

export default function Admin(props) {
  let history = useHistory();
  const path = "/admin";
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


  const clickDashboard = () => {
    history.push("/admin");
  };

  const clickDepartment = () => {
    history.push("/admin/departments");
  };

  const clickCategories = () => {
    history.push("/admin/categories");
  };

  const clickUsers = () => {
    history.push("/admin/users");
  };

  const clickKinds = () => {
    history.push("/admin/kinds");
  };

  const clickImages = () => {
    history.push(`${path}/list-images`);
  };

  const clickNews = () => {
    history.push("/admin/news");
  };

  const clickStatiscal = () => {
    history.push("/admin/statistical");
  };

  const onClickInfoUser = () => {
    const id = localStorage.getItem('idUser')
    history.push(`${path}/info-user/${id}`);
  };

  return (
    localStorage.getItem('power') === "1" ? 
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
              <div className={`nav__link a ${props.location.pathname === '/admin' && 'active'}`} onClick={clickDashboard}>
                <span className="las la-igloo"></span>
                <span>Dashboard</span>
              </div>
            </li>

            <li>
              <div onClick={clickNews} className={`nav__link a ${props.location.pathname === '/admin/news' && 'active'}`}>
                <span>
                  <AiOutlineOrderedList />
                </span>
                <span>Quản lý bài viết</span>
              </div>
            </li>
            
            <li>
              <div onClick={clickUsers} className={`nav__link a ${props.location.pathname === '/admin/users' && 'active'}`}>
                <span>
                  <AiOutlineTeam />
                </span>
                <span>Quản lý người dùng</span>
              </div>
            </li>

            <li>
              <div onClick={clickDepartment} className={`nav__link a ${props.location.pathname === '/admin/departments' && 'active'}`}>
                <span>
                  <AiOutlineUnorderedList />
                </span>
                <span>Quản lý phòng ban</span>
              </div>
            </li>

            <li>
              <div onClick={clickCategories} className={`nav__link a ${props.location.pathname === '/admin/categories' && 'active'}`}>
                <span>
                  <BiFoodMenu />
                </span>
                <span>Chuyên mục đăng</span>
              </div>
            </li>

            <li>
              <div onClick={clickKinds} className={`nav__link a ${props.location.pathname === '/admin/kinds' && 'active'}`}>
                <span>
                  <GoChecklist />
                </span>
                <span>Quản lý thể loại</span>
              </div>
            </li>

            <li>
              <div onClick={() => history.push("/admin/price-of-kinds")} className={`nav__link a ${props.location.pathname === '/admin/price-of-kinds' && 'active'}`}>
                <span>
                  <GoChecklist />
                </span>
                <span>Quản lý loại tin</span>
              </div>
            </li>

            <li>
              <div onClick={() => history.push(`${path}/list-images`)} className={`nav__link a ${props.location.pathname === `${path}/list-images` && 'active'}`}>
                <span>
                  <AiOutlinePicture />
                </span>
                <span>Quản lý hình ảnh</span>
              </div>
            </li>

            <li>
              <div onClick={() => history.push(`${path}/list-kind-images`)} className={`nav__link a ${props.location.pathname === `${path}/list-kind-images` && 'active'}`}>
                <span>
                  <AiOutlinePicture />
                </span>
                <span>Quản lý loại ảnh</span>
              </div>
            </li>

            <li>
              <div onClick={clickStatiscal} className={`nav__link a ${props.location.pathname === '/admin/statistical' && 'active'}`}>
                <span>
                  <BsTable />
                </span>
                <span>Thống kê</span>
              </div>
            </li>
            <li>
              <div onClick={onClickInfoUser} className={`nav__link a`}>
                <span>
                <AiFillInfoCircle />
                </span>
                <span>Thay đổi thông tin tài khoản</span>
              </div>
            </li>

            <li>
              <div onClick={logout} className={`nav__link a`}>
                <span>
                  <AiOutlineLogout />
                </span>
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

            <div>
              <h4>{username ? username.username : null}</h4>
              {/* <small>{username ? username.power : null}</small> */}
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
                  <Route path={`${path}/users/add`}>
                    <CreateUser path={path}></CreateUser>
                  </Route>
                  <Route
                    path={`${path}/info-user/:id`}
                    key={props.location.key}
                    render={({ match }) => (
                      <UpdateUsers
                        key={props.location.key}
                        match={match}
                        path={path}
                      />
                    )}
                  ></Route>
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

                  <Route
                    path={`${path}/news/views/:id`}
                    key={props.location.key}
                    render={({ match }) => (
                      <ViewNews key={props.location.key} match={match} />
                    )}
                  ></Route>

                  <Route path={`${path}/news/add`}>
                    <CreateNews path={path} role={ADMIN_ROLE}></CreateNews>
                  </Route>

                  <Route
                    path={`${path}/news/:id`}
                    key={props.location.key}
                    render={({ match }) => (
                      <UpdateNews
                        key={props.location.key}
                        match={match}
                        path={path}
                        role={ADMIN_ROLE}
                      />
                    )}
                  ></Route>

                  <Route path={`${path}/news`}>
                    <ListNews path={path}></ListNews>
                  </Route>

                  <Route
                    path={`${path}/list-images/edit/:id`}
                    key={props.location.key}
                    render={({ match }) => (
                      <UpdateImages
                        key={props.location.key}
                        match={match}
                        path={path}
                      />
                    )}
                  ></Route>
                  <Route path={`${path}/list-images/add`}>
                    <CreateImages></CreateImages>
                  </Route>

                  <Route path={`${path}/list-images`}>
                    <ListImages path={path}></ListImages>
                  </Route>

                  <Route
                    path={`${path}/list-kind-images/edit/:id`}
                    key={props.location.key}
                    render={({ match }) => (
                      <UpdateKindImages
                        key={props.location.key}
                        match={match}
                        path={path}
                      />
                    )}
                  ></Route>
                  <Route path={`${path}/list-kind-images/add`}>
                    <CreateKindImages/>
                  </Route>

                  <Route path={`${path}/list-kind-images`}>
                    <ListKindImages path={path}/>
                  </Route>

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

                  <Route
                    path={`${path}/price-of-kinds/edit/:id`}
                    key={props.location.key}
                    render={({ match }) => (
                      <UpdatePriceOfKindComponent
                        key={props.location.key}
                        match={match}
                        path={path}
                      />
                    )}
                  ></Route>

                  <Route path={`${path}/price-of-kinds/add`}>
                    <CreatePriceOfKindComponent />
                  </Route>
                
                  <Route path={`${path}/price-of-kinds`}>
                    <ListPriceOfKind path={path}></ListPriceOfKind>
                  </Route>
                  
                  <Route
                    path={`${path}/news-approved`}
                    component={ListNewsApproved}
                  ></Route>

                  <Route
                    path={`${path}/news-waiting-for-approval`}
                    component={ListNewsWaitingForApproval}
                  />  

                  <Route path={`${path}/statistical/author`}>
                    <ListNewAuthor path={`${path}/statistical/author`}></ListNewAuthor>
                  </Route>

                  <Route path={`${path}/statistical/kind`}>
                    <NewsFromMonth path={`${path}/statistical/kind`}/>
                  </Route>
                  <Route path={`${path}/statistical/department`}>
                    <NewsFromYear path={`${path}/statistical/department`}/>
                  </Route>

                  <Route path={`${path}/list-images`}>
                    <ListNews path={path}></ListNews>
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
