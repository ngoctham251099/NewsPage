import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Moment from "react-moment";
import { toast } from "react-toastify";

export default function ListEditor(props) {
  let history = useHistory();
  let stt = 1;

  const [listKind, setListKind] = useState([]);

  const [news, setNews] = useState([]);
  useEffect(async () => {
    const id = localStorage.getItem("idUser");
    console.log(id)
    const res = await axios.get(`/api-news/list-btv-approved?id=${id}`);
    if (res.data.listNews) {
      setNews(res.data.listNews);
    } else {
      toast.error(res.data.message);
    }
  }, []);

  useEffect(() => {
    axios.get("/api-kind").then((res) => {
      setListKind(res.data.kind);
    });
  }, []);

  const getStatus = (power) => {
    switch (power) {
      case "1":
        return "Chờ phê duyệt";
      // break;
      case "2":
        return "Đã xác nhận";
      // break;
      case "3":
        return "Đã phê duyệt";
      // break;
      case "4":
        return "Từ chối";
      // break;
      default:
        break;
    }
  };


  return (
    <div>

      <div className="card-header">
        <h3>Danh Sách bài viết đã duyệt</h3>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table width="100%">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tiêu đề</th>
                <th>Thumbnail</th>
                <th>Bút danh</th>
                <th>Ngày viết</th>
                <th>Ngày duyệt</th>
                <th>Xem bài</th>
              </tr>
            </thead>
            <tbody>
              {news.map((item) => (
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
                    <Moment format="DD/MM/YYYY">{item.date_submitted}</Moment>
                  </td>

                  <td>
                    <Moment format="DD/MM/YYYY">{item.date_BTV}</Moment>
                  </td>

                  <td>
                    <Link to={`${props.path}/news/views/${item._id}`}>
                      Views
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
