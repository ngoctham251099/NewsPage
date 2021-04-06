import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Moment from "react-moment";
import { BsPencil } from "react-icons/bs";
import Button from "../UI/button-add";

export default function ListEditor(props) {
  let history = useHistory();
  let stt = 1;
  let checked = false;

  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const [listKind, setListKind] = useState([]);
  const [note, setNote] = useState();

  const [news, setNews] = useState([]);
  const [message, setMessage] = useState();
  useEffect(async () => {
    const id = localStorage.getItem("idUser");
    const res = await axios.get(`http://127.0.0.1/api/api-news/views-president?id=${id}`, {
      id: localStorage.getItem("idUSer"),
    });
    if (res.data.listNews) {
      setNews(res.data.listNews);
    } else {
      setMessage(res.data.message);
    }
  }, []);

  useEffect(() => {
    axios.get("http://127.0.0.1/api/api-kind").then((res) => {
      console.log(res.data.kind);
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

  const show_item_after_delete = () => {
    setTimeout(async () => {
      const id = localStorage.getItem("idUser");
      const res = await axios.get(`http://127.0.0.1/api/api-news/views-president?id=${id}`, {
        id: localStorage.getItem("idUSer"),
      });
      if (res.data.listNews) {
        setNews(res.data.listNews);
      }
    }, 100);
  };

  const updateStatus = async (idNews) => {
    const id = localStorage.getItem("idUser");
    const res = await axios.post(
      `/api-news/update-chief-editor/${id}/${idNews}`,
      {
        note: note,
      }
    );
    if (res.data.message == "Đã duyệt tin") {
      setSuccess(res.data.message);
      show_item_after_delete();
    } else {
      setError(res.data.message);
    }
  };

  const updateRefuse = async (idNews) => {
    const id = localStorage.getItem("idUser");
    const res = await axios.post(`http://127.0.0.1/api/api-news/update-refuse/${id}/${idNews}`, {
      note: note,
    });
    if (res.data.message == "Đã từ chối duyệt tin") {
      setSuccess(res.data.message);
      console.log("shygfjdsj");
      show_item_after_delete();
    } else {
      setError(res.data.message);
    }
  };

  const onChangeNote = (e) => {
    console.log(e.target.value);
    setNote(e.target.value);
  };

  const onclick = () => {
    checked = true;
  };

  return (
    <div>
      {/* <Prompt message="Are you sure you want to leave?" /> : null} */}

      <div className="card-header">
        <h3>Recent Projects</h3>
        <button
          onClick={() => {
            history.push(`${props.path}/news/add`);
          }}
        >
          Thêm <span class="las la-arrow-right"></span>
        </button>
      </div>

      <div className="card-body">
        <label>Note</label>
        <div className="table-responsive">
          <table width="100%">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tiêu đề</th>
                <th>Avatar</th>
                <th>Bút danh</th>
                <th>Ngày viết</th>
                <th>Phòng ban</th>
                <th>Loại tin</th>
                <th>Xem thử</th>
                <th>Hành Động</th>
                {/* <th>Chấp nhận</th>
                <th>Từ chối</th>
                <th>Ghi chú</th> */}
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
                  {/* <td>{getStatus(item.status)}</td> */}
                  {/* <td>{item.status}</td> */}
                  <td>{item.department}</td>
                  <td>{item.kindNews}</td>
                  <td>
                    <Link to={`${props.path}/news/views/${item._id}`}>
                      Xem thử
                    </Link>
                  </td>
                  <td>
                    <Link to={`${props.path}/news/${item._id}`}>
                      Chỉnh sửa và duyệt tin
                    </Link>
                  </td>
                  {/* <td>
                    <Button
                      title="Duyệt tin"
                      onClick={() => updateStatus(item._id)}
                    ></Button>
                  </td>
                  <td>
                    <Button
                      title="Từ chối"
                      onClick={() => updateRefuse(item._id)}
                    ></Button>
                  </td>
                  <td>
                    <Button title="Ghi chú" onClick={onclick}></Button>
                  </td>
                  <td></td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
