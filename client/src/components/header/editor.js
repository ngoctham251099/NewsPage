import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import "../Design/css/admin.css";
import "../Design/js/jsAdmin";
import ViewNews from "../news/ViewsNews";
import ListEditor from "../news/list_editor";
import CreateNews from "../news/create";
import UpdateNews from "../news/edit-news";
import ListWriter from "../news/list_writer";
import ListBTVApproved from "../news/list-btv-approved";
import ListBTVRefuse from "../news/list-btv-refuse";
import ListBTVEditContent from "../news/list-news-edit-content";
import axios from "axios";
import { BAN_BT_ROLE } from "../../config/roles";
import Page404 from "./page 404";
import { AiOutlineOrderedList, AiFillInfoCircle, AiOutlineLogout } from "react-icons/ai";
import user from "../images/user.png";
import UpdateUser from "../users/update-info-user";
import { toast } from "react-toastify";

export default function Admin(props) {
  let path = "/editor";
  let history = useHistory();
  const [username, setUsername] = useState();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("idUser");
    localStorage.removeItem("power");
    history.push("/");
  };

  useEffect(() => {
    const id = localStorage.getItem("idUser");
    axios.post(`/api-user/user-id/${id}`).then((res) => {
      setUsername(res.data.user);
    });
  }, []);

  // useEffect(async () => {
	// 	const id = localStorage.getItem("idUser");
	// 	const res = await axios.get(`/api-news/view-writer?id=${id}`, {
	// 		id: localStorage.getItem("idUSer"),
	// 	});
	// }, []);

  useEffect(async () => {
    const id = localStorage.getItem("idUser");
    console.log(id)
    const res = await axios.get(`/api-news/list-news-request-edit?id=${id}`, {
      id: localStorage.getItem("idUSer")
    });
    console.log(res.data.listNews)
    if (res.data.listNews.length > 0) {
      console.log(res.data.listNews)
      const db = res.data.listNews;
     const data = await db.filter( item => item.status === "6");
			let count = data.length;
			if(count > 0){
				toast.warning(`Bạn đang có ${count} bài viết đang yêu cầu chỉnh sửa`);
			}
    } else {
      toast.error(res.data.message);
    }
  }, []);

  useEffect(() => {
    const linkColor = document.querySelectorAll(".nav__link");
    function colorLink() {
      if (linkColor) {
        linkColor.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");
      }
    }
    linkColor.forEach((l) => l.addEventListener("click", colorLink));
  }, []);

  const getStatus = (power) => {
    switch (power) {
      case "1":
        return "Chờ phê duyệt";
      case "2":
        return "Đã xác nhận";
      case "3":
        return "Đã phê duyệt";
      case "4":
        return "Từ chối";
      default:
        break;
    }
  };

  const onClick = () => {
    history.push(`${path}`);
  };

  const onClickListWriter = () => {
    history.push(`${path}/list-writer`);
  };

  const onClickListBTVApproved = () => {
    history.push(`${path}/list-btv-approved`);
  };

  const onClickInfoUser = () => {
    const id = localStorage.getItem('idUser')
    history.push(`${path}/info-user/${id}`);
  };

  const onClicklistRefuse = () => {
    history.push(`${path}/list-new-refuse`);
  };

  const onClicklistRequestEdit = () => {
    history.push(`${path}/list-news-request-edit`);
  };

  return (
    localStorage.getItem('power') === "3" ?
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
              <div onClick={onClick} class="nav__link active">
                <span class="las la-igloo"></span>
                <span>Danh sách tin chờ duyệt</span>
              </div>
            </li>

            <li>
              <div onClick={onClickListWriter} className={`nav__link a`}>
                <span >
                <AiOutlineOrderedList />
                </span>
                <span>Bài viết cá nhân</span>
              </div>
            </li>

            <li>
              <div onClick={onClickListBTVApproved} className={`nav__link a`}>
                <span >
                <AiOutlineOrderedList />
                </span>
                <span>Bài viết đã duyệt</span>
              </div>
            </li>

            <li>
              <div onClick={onClicklistRequestEdit} className={`nav__link a`}>
                <span >
                <AiOutlineOrderedList />
                </span>
                <span>Bài viết yêu cầu chỉnh sửa</span>
              </div>
            </li>

            <li>
              <div onClick={onClicklistRefuse} className={`nav__link a`}>
                <span >
                <AiOutlineOrderedList />
                </span>
                <span>Bài viết đã từ chối</span>
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
                <span >
                <AiOutlineLogout />
                </span>
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
          </h2>

          <div class="user-wrapper">
          <img src={user} width="40px" height="40px" alt="" />
            <div>
              <h4>{username ? username.username : null}</h4>
            </div>
          </div>
        </header>

        <main>
          <div class="cards"></div>

          <div class="recent-grid">
            <div className="projects">
              <div className="card">
                <Switch>
                  <Route
                    path={`${path}/news/views/:id`}
                    key={props.location.key}
                    render={({ match }) => (
                      <ViewNews key={props.location.key} match={match} role={BAN_BT_ROLE} />
                    )}
                  ></Route>
                  <Route path={`${path}/news/add`}>
                    <CreateNews path={path} role={BAN_BT_ROLE} />
                  </Route>

                  <Route
                    path={`${path}/news/:id`}
                    key={props.location.key}
                    render={({ match }) => (
                      <UpdateNews key={props.location.key} match={match} role={BAN_BT_ROLE}/>
                    )}
                  ></Route>

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

                  <Route path={`${path}/list-writer`}>
                    <ListWriter  path={path} />
                  </Route>
                  
                  <Route path={`${path}/list-news-request-edit`}>
                    <ListBTVEditContent  path={path} />
                  </Route>

                  <Route path={`${path}/list-btv-approved`}>
                    <ListBTVApproved  path={path} />
                  </Route>

                  <Route path={`${path}/list-new-refuse`}>
                    <ListBTVRefuse  path={path} />
                  </Route>

                  <Route path={`${path}`}>
                    <ListEditor path={path} />
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
