import React, { useEffect, useState } from "react";
import axios from "axios";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { BsPencil } from "react-icons/bs";

import Button from "../UI/button-add";
import Select from "../UI/select";

function ListNews(props) {
  const [news, setNews] = useState([]);
  const [images, setImages] = useState();
  const [view, setView] = useState();
  const [count, setCount] = useState();
  const [listcategories, setListCategories] = useState();
  const [categoried, setCategories] = useState();
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  let stt = 1;
  let d = 0;
  useEffect(() => {
    axios.get("/api-news/list-news-approved").then((res) => {
      setNews(res.data.listNewsApproved);
      setImages(res.data.images);
    });
  }, []);

  const show_item_after_delete = () => {
    setTimeout(() => {
      const id = localStorage.getItem("idUser");
      axios
        .get(`/api-news/views-editor?id=${id}`, {
          id: localStorage.getItem("idUSer"),
        })
        .then((res) => {
          setNews(res.data.listNews);
        });
    }, 100);
  };

  const updateStatus = async (idNews) => {
    const id = localStorage.getItem("idUser");
    console.log(id);
    const res = await axios.post(`/api-news/update-secretary/${id}/${idNews}`, {
      categories: categoried,
    });
    if (res.data.message == "Đã duyệt tin") {
      console.log(res.data.message);
      setSuccess(res.data.message);
      show_item_after_delete();
    } else {
      console.log(res.data.message);
      setError(res.data.message);
    }
  };

  const ViewsId = (id) => {
    axios.post(`/api-news/view/${id}`).then((res) => {
      if (res.data) {
        setView(true);
      } else {
      }
    });
  };

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
      case "5":
        return "Đăng tin";
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const countNews = () => {
      news.forEach((item) => {
        d++;
      });
      setCount(d);

      let list = news.filter((elem, index, seft) => {
        seft.findIndex((t) => {
          return (t.author == elem.author) === index;
        });
      });
      console.log(list);

      // list = list.filter((elem, index, self) => self.findIndex(
      //     (t) => {return (t.x === elem.x && t.y === elem.y)}) === index)
    };
    countNews();
  }, []);

  const onChangeCate = (e) => {
    console.log(e.target.value);
    setCategories(e.target.value);
  };

  return (
    <div>
      <div className="card-header">
        <h3>Danh sách tin chờ đăng</h3>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table width="100%">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tiêu đề</th>
                <th>Avatar</th>
                <th>Tác giả</th>
                <th>Ngày viết</th>
                <th>Trạng thái</th>
                <th>Phòng ban</th>
                <th>Xem thử</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
                {console.log(news)}
              {news.length
                ? news.map((item) => (
                    <tr key={item._id}>
                      <td>{stt++}</td>
                      <td>{item.title}</td>
                      <td>
                        <img
                          width={150}
                          src={`/api-news/viewFile/${item.avatar}`}
                        ></img>
                      </td>
                      <td>{item.author}</td>
                      <td>
                        <Moment format="DD/MM/YYYY">
                          {item.date_submitted}
                        </Moment>
                      </td>
                      {/* <td>{item.images.map(element => (
                                            <img width={400} src={`/api-news/viewFile/${element}`}></img>
                                        ))}</td>					     */}
                      <td>{getStatus(item.status)}</td>
                      <td>{item.department}</td>

                      <td>
                        <Link to={`${props.path}/news/views/${item._id}`}>
                          Xem thử
                        </Link>
                      </td>
                      <td>
                        <Link to={`${props.path}/news/${item._id}`}>
                          Chỉnh sửa và đăng tin
                        </Link>
                      </td>
                      {/* <td><Button onClick={()=>updateStatus(item._id)} title="Đăng tin"/></td> */}
                    </tr>
                  ))
                : <tr><td colSpan="9" style={{paddingTop: 12}}>Không có tin nào chờ đăng</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListNews;
