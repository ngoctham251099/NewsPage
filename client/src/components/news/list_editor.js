import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Prompt } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Moment from "react-moment";
import { BsPencil } from "react-icons/bs";
import Button from "../UI/button-add";
import Select from "../UI/select";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { toast } from "react-toastify";

export default function ListEditor(props) {
  let history = useHistory();
  let stt = 1;

  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const [listKind, setListKind] = useState([]);
  const [kind, setKind] = useState();
  const [checked, setChecked] = useState(false);

  const [news, setNews] = useState([]);
  useEffect(async () => {
    const id = localStorage.getItem("idUser");
    const res = await axios.get(`http://3.130.135.8/api/api-news/views-editor?id=${id}`, {
      id: localStorage.getItem("idUSer"),
    });
    if (res.data.listNews) {
      setNews(res.data.listNews);
    } else {
      toast.error(res.data.message);
    }
  }, []);

  useEffect(() => {
    axios.get("http://3.130.135.8/api/api-kind").then((res) => {
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

  const updateStatus = async (idNews) => {
    const id = localStorage.getItem("idUser");
    const res = await axios.post(`http://3.130.135.8/api/api-news/update-status/${id}/${idNews}`, {
      kind: kind,
    });
    if (res.data.message == "Đã duyệt tin") {
      toast.success(res.data.message);
      show_item_after_delete();
    } else {
      toast.error(res.data.message);
    }
  };

  const updateRefuse = async (idNews) => {
    const id = localStorage.getItem("idUser");
    const res = await axios.post(`http://3.130.135.8/api/api-news/update-refuse/${id}/${idNews}`, {
      kind: kind,
    });
    if (res.data.message == "Đã từ chối duyệt tin") {
      setSuccess(res.data.message);
      show_item_after_delete();
    } else {
      setError(res.data.message);
    }
  };

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

  const onChangeKind = (e) => {
    setKind(e.target.value);
  };

  return (
    <div>
      {/* <Prompt message="Are you sure you want to leave?" /> : null} */}

      <div className="card-header">
        <h3>Danh Sách Bài Viết</h3>
        <button
          onClick={() => {
            history.push(`${props.path}/news/add`);
          }}
        >
          Thêm
        </button>
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
                <th>Phòng ban</th>
                <th>Xem bài</th>
                <th>Hành động</th>
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
                  {/* <td>
                    <Select list={listKind} onChange={onChangeKind}></Select>
                  </td> */}
                  <td>
                    <Link to={`${props.path}/news/views/${item._id}`}>
                      Views
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
