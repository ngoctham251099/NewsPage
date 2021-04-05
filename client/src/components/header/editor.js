import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import "../Design/css/admin.css";
import "../Design/js/jsAdmin";
import ViewNews from "../news/ViewsNews";
import ListEditor from "../news/list_editor";
import CreateNews from "../news/create";
import UpdateNews from "../news/edit-news";
import axios from "axios";
import { BAN_BT_ROLE } from "../../config/roles";

export default function Admin(props) {
  let path = "/editor";
  let history = useHistory();
  const [news, setNews] = useState([]);
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
      setUsername(res.data.News);
    });
  }, []);

  let stt = 1;
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
        break;
      case "2":
        return "Đã xác nhận";
        break;
      case "3":
        return "Đã phê duyệt";
        break;
      case "4":
        return "Từ chối";
        break;
      default:
        break;
    }
  };

  const onClick = () => {
    history.push(`${path}`);
  };

  return (
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
                <span>Dashboard</span>
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
          </h2>

          <div class="user-wrapper">
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
                      <ViewNews key={props.location.key} match={match} />
                    )}
                  ></Route>

                  <Route
                    path={`${path}/news/:id`}
                    key={props.location.key}
                    render={({ match }) => (
                      <UpdateNews key={props.location.key} match={match} />
                    )}
                  ></Route>

                  <Route path={`${path}/news/add`}>
                    <CreateNews path={path} role={BAN_BT_ROLE}/>
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
  );
}
