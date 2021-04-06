import React, { useEffect, useState } from "react";
import axios from "axios";
import Moment from "react-moment";
import { BsTrashFill } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";
import { toast } from "react-toastify";
import Select from "../UI/select";

import { useHistory, Link } from "react-router-dom";

const listStatus = [
  {
    id: "-1",
    value: "tất cả bài viết",
  },
  {
    id: "1",
    value: "đang chờ phê duyệt",
  },
  {
    id: "2",
    value: "đã xác nhận từ ban biên tập",
  },
  {
    id: "3",
    value: "đã được phê duyệt từ trưởng ban biên tập",
  },
  {
    id: "4",
    value: "đã được đăng",
  },
  {
    id: "0",
    value: "đã bị từ chối",
  },
 
];
function ListNews(props) {
  let history = useHistory();
  const [news, setNews] = useState([]);
  const [images, setImages] = useState();
  const [view, setView] = useState();
  const [count, setCount] = useState();
  const [message, setMessage] = useState();
  let stt = 1;
  let d = 0;
  useEffect(() => {
    axios.get("http://127.0.0.1/api/api-news/").then((res) => {
      setNews(res.data.page);
      setImages(res.data.images);
    });
  }, []);

  const [currentFilter, setCurrentFilter] = useState("-1");

  const getStatus = (power) => {
    switch (power) {
      case "1":
        return "Chờ phê duyệt";

      case "2":
        return "Đã xác nhận";

      case "3":
        return "Đã phê duyệt";

      case "4":
        return "Tin đã đăng";

      case "0":
        return "Đã từ chối";
      default:
        break;
    }
  };

  const show_item_after_delete = () => {
    setTimeout(() => {
      axios.get(`http://127.0.0.1/api/api-news`).then((res) => {
        // history.push(`${props.path}/news`)
        setNews(res.data.page);
        setImages(res.data.images);
      });
    }, 100);
  };

  let Remove = (id) => {
    axios.delete(`http://127.0.0.1/api/api-news/remove/${id}`).then((res) => {
      toast.success(res.data.message);
      show_item_after_delete();
    });
  };

  return (
    <div>
      <div className="card-header">
        <h3>
          Danh sách bài viết
          <select
            style={{
              marginLeft: "12px",
              height: "30px",
              borderRadius: "12px",
            }}
            onChange={(e) => setCurrentFilter(e.target.value)}
          >
            {listStatus.map((status) => (
              <option value={status.id}>{status.value}</option>
            ))}
          </select>
        </h3>
        <button
          onClick={() => {
            history.push(`${props.path}/news/add`);
          }}
        >
          Thêm
        </button>
      </div>
      <div className="card-body" style={{ overflow: "auto" }}>
        <div className="table-responsive">
          <table width="100%">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tiêu đề</th>
                <th>Thumbnail</th>
                <th>Bút danh</th>
                <th>Ngày viết</th>
                <th>Trạng thái</th>
                <th>Phòng ban</th>
                <th>Loại tin</th>
                <th>Chuyên mục</th>
                <th>Xem</th>
                <th>Edit</th>
                <th>Remove</th>
                <th>Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {news
                .filter((item) => {
                  if (currentFilter === "-1") return item;
                  return item.status === currentFilter;
                })
                .map((item) => (
                  <tr key={item._id}>
                    <td>{stt++}</td>
                    <td
                      style={{
                        maxWidth: "180px",
                        overflowWrap: "break-word",
                      }}
                    >
                      {item.title}
                    </td>
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
                    {/* <td>{item.images.map(element => (
                                        <img width={400} src={`/api-news/viewFile/${element}`}></img>
                                    ))}</td>					     */}
                    <td>{getStatus(item.status)}</td>
                    {/* <td>{item.status}</td> */}
                    <td>{item.department}</td>
                    <td>{item.kindNews}</td>
                    <td>{item.categories}</td>
                    <td>
                      <Link to={`${props.path}/news/views/${item._id}`}>
                        Xem thử
                      </Link>
                    </td>
                    <td>
                      <Link to={`${props.path}/news/${item._id}`}>
                        <BsPencil />
                      </Link>
                    </td>
                    <td>
                      <span onClick={() => Remove(item._id)}>
                        <BsTrashFill />
                      </span>
                    </td>
                    <td>{item.note}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListNews;
