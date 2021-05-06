import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { toast } from "react-toastify";

const listSearch = [
	{
		id: "1",
		value: "Tiêu đề"
	},
	{
		id: "2",
		value: "Tác giả"
	},
	// {
	// 	id: "3",
	// 	value: "Loại tin"
	// },

]


export default function ListEditor(props) {
  let stt = 1;

  const [listKind, setListKind] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("1");
  const [search, setSearch] = useState("");

  const [news, setNews] = useState([]);
  useEffect(async () => {
    const id = localStorage.getItem("idUser");
    console.log(id)
    const res = await axios.get(`/api-news/list-news-BTV?id=${id}`, {
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
        <h3>Danh Sách Bài Viết Chờ Duyệt</h3>
        <div className="search" style={{
					textAlign:"center"
				}}>
					<input style={{
						padding: ".6rem",
						outline: "none",
						border: "1px solid",
						width: "600px"
					}} type="text" placeholder="Tìm kiếm" onChange={(e) => {setSearch(e.target.value)}}></input>
					<select
							style={{
								height: "30px",
								height: "41px",
								outline: "none"
							}}
							onChange={(e) => { setCurrentFilter(e.target.value)}}
						>
							{listSearch.map((status) => (
								<option value={status.id}>{status.value}</option>
							))}
					</select>
				</div>
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
                <th>Xem bài</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {news
              .filter(val => {
                if(search == ""){
                  return val;
                }
                
                if(currentFilter === "1"){
                  if(val.title.toLowerCase().includes(search.toLowerCase())){
                    return val;
                  }
                }
  
                if(currentFilter === "2"){
                  if(val.author.toLowerCase().includes(search.toLowerCase())){
                    return val;
                  }
                }
                // if(currentFilter === "3"){
                //   if(val.nameKind.toLowerCase().includes(search.toLowerCase())){
                //     return val;
                //   }
                // }
                
              })
              .map((item) => (
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
