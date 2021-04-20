import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Moment from "react-moment";

export default function ListEditor(props) {

  const [listKind, setListKind] = useState([]);

  const [news, setNews] = useState([]);
  const [message, setMessage] = useState();
  useEffect(async () => {
    const id = localStorage.getItem("idUser");
    const res = await axios.get(`/api-news/views-president?id=${id}`, {
      id: localStorage.getItem("idUSer"),
    });
    if (res.data.listNews) {
      console.log(res.data.listNews)
      setNews(res.data.listNews);
    } else {
      setMessage(res.data.message);
    }
  }, []);

  useEffect(() => {
    axios.get("/api-kind").then((res) => {
      console.log(res.data.kind);
      setListKind(res.data.kind);
    });
  }, []);

  return (
    <div>

      <div className="card-header">
        <h3>Danh sách bài viết cần duyệt</h3>
        {/* <button
          onClick={() => {
            history.push(`${props.path}/news/add`);
          }}
        >
          Thêm <span class="las la-arrow-right"></span>
        </button> */}
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
                <th>Thể loại</th>
                <th>Xem thử</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {news ? 
              news.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item._doc.title}</td>
                  <td>
                    <img
                      width={150}
                      src={`/api-news/viewFile/${item._doc.avatar}`}
                    ></img>
                  </td>
                  <td>{item._doc.author}</td>
                  <td>
                    <Moment format="DD/MM/YYYY">{item._doc.date_submitted}</Moment>
                  </td>
                  <td>{item.nameKind}</td>
                  <td>
                    <Link to={`${props.path}/news/views/${item._doc._id}`}>
                      Xem thử
                    </Link>
                  </td>
                  <td>
                    <Link to={`${props.path}/news/${item._doc._id}`}>
                      Chỉnh sửa và duyệt tin
                    </Link>
                  </td>
                </tr>
              )): null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
