import React, { useEffect, useState } from "react";
import {  Route, Switch, useHistory } from "react-router-dom";
import "../Design/css/admin.css";
import "../Design/js/jsAdmin";
import ListNewsWriter from "../news/list_writer";
import ListNewsEditRequired from "../news/list-news-edit-required-ctv";
import ViewNews from "../news/ViewsNews";
import CreateNews from "../news/create";
import axios from "axios";
import UpdateNews from "../news/edit-news";
import { CTV_ROLE } from "../../config/roles";
import { AiFillInfoCircle } from "react-icons/ai";
import UpdateUser from "../users/update-info-user";
import user from "../images/user.png";
import Page404 from "./page 404";
import { toast } from "react-toastify";

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
  // const [count, setCount] = useState();

  // useEffect(async () => {
	// 	const id = localStorage.getItem("idUser");
	// 	const res = await axios.get(`/api-news/view-writer?id=${id}`, {
	// 		id: localStorage.getItem("idUSer"),
	// 	});
	// 	if (res.data.arrNews) {
	// 		const data = await res.data.arrNews.filter( item => item.status === "5");
	// 		// setCount(data.length)
  //     let count = data.length;
	// 		if(count > 0){
	// 			toast.warning(`Bạn đang có ${count} bài viết đang yêu cầu chỉnh sửa`);
	// 		}
	// 	} 
	// }, []);

  useEffect(async () => {
		const id = localStorage.getItem("idUser");
		const res = await axios.get(`/api-news/view-writer?id=${id}`, {
			id: localStorage.getItem("idUSer"),
		});
		// setNews(res.data.arrNews);
		if (res.data.arrNews.length > 0) {
			
			// setNews(res.data.arrNews);
			const data = await res.data.arrNews.filter( item => item._doc.status === "5");
			let count = data.length;
			if(count > 0){
				toast.warning(`Bạn đang có ${count} bài viết đang yêu cầu chỉnh sửa`);
			}
		} 
	}, []);

  useEffect(() => {
    const id = localStorage.getItem("idUser");
    axios.post(`/api-user/user-id/${id}`).then((res) => {
      setUsername(res.data.user);
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
                className={`nav__link a ${
                  props.location.pathname === "/news-writer/list-news-edit-required" && "active"
                }`}
                onClick={() => history.push("/news-writer/list-news-edit-required")}
              >
                <span class="las la-clipboard-list"></span>
                <span>DS yêu cầu chỉnh sửa </span>
              </div>
            </li>

            <li>
              <div
                className={`nav__link a ${
                  props.location.pathname === `${path}/info-user/${localStorage.getItem('idUser')}` && "active"
                }`}
                onClick={onClickInfoUser}
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

                  <Route path={`${path}/list-news-edit-required`}>
                    <ListNewsEditRequired path={path} role={CTV_ROLE} />
                  </Route>

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
