import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { toast } from "react-toastify";

export default function ListEditor(props) {
  let stt = 1;

  const [listKind, setListKind] = useState([]);

  const [news, setNews] = useState([]);
  useEffect(async () => {
    const id = localStorage.getItem("idUser");
    console.log(id)
    const res = await axios.get(`/api-news/list-news-request-edit?id=${id}`, {
      id: localStorage.getItem("idUSer"),
    });
    if (res.data.listNews) {
      console.log(res.data.listNews)
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

  return (
    <div>
      {/* <Prompt message="Are you sure you want to leave?" /> : null} */}

      <div className="card-header">
        <h3>Danh Sách Bài Viết</h3>
        {/* <button
          onClick={() => {
            history.push(`${props.path}/news/add`);
          }}
        >
          Thêm
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
                <th>Ghi chú</th>
                <th>Xem bài</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {news.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1  }</td>
                  <td style={{
												maxWidth: "180px",
												overflowWrap: "break-word",
											}}>{item.title}</td>
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
                  <td style={{
												maxWidth: "180px",
												overflowWrap: "break-word",
											}}>{item.note}</td>

                  <td>
                    <Link to={`${props.path}/news/views/${item._id}`}>
                      Xem thử
                    </Link>
                  </td>

                  <td style={{ width: 120 }}>
                    <span style={{ padding: "5px" }}>
                      <Link to={`${props.path}/news/${item._id}`}>
                          Chỉnh sửa và phê duyệt
                      </Link>
                    </span>
                    {/* <span style={{ padding: "5px" }}>
                      <FaCheckCircle
                        color="#6DD400"
                        onClick={() => updateStatus(item._id)}
                      />
                    </span>
                    <span style={{ padding: "5px" }}>
                      <FaExclamationTriangle
                        color="#FF302F"
                        onClick={() => updateRefuse(item._id)}
                    </span>
                      /> */}
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
