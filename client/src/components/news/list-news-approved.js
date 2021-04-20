import React, { useEffect, useState } from "react";
import axios from "axios";
import Moment from "react-moment";
import { Link } from "react-router-dom";

function ListNews(props) {
  const [news, setNews] = useState([]);
  const [images, setImages] = useState();
  const [count, setCount] = useState();
  let stt = 1;
  let d = 0;
  useEffect(() => {
    axios.get("/api-news/list-news-approved").then((res) => {
      setNews(res.data.listNewsApproved);
      setImages(res.data.images);
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

      case "5":
        return "Đăng tin";
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
                <th>Bút danh</th>
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
