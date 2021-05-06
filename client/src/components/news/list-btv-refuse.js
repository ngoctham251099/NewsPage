import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Moment from "react-moment";
const listSearch = [
	{
		id: "1",
		value: "Tiêu đề"
	},
	{
		id: "2",
		value: "Tác giả"
	},
  {
		id: "3",
		value: "Loại tin"
	},

]

export default function ListEditor(props) {
  let stt = 1;

  const [search, setSearch] = useState("");
  const [currentFilter, setCurrentFilter] = useState("1");

  const [news, setNews] = useState([]);
  useEffect(async () => {
    const id = localStorage.getItem("idUser");
    console.log(id)
    const res = await axios.get(`/api-news/list-news-btv-refuse?id=${id}`);
    console.log(res.data.listNews)
    if (res.data.listNews) {
      setNews(res.data.listNews);
    }
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
        return "Yêu cầu chỉnh sửa";
      default:
        break;
    }
  };


  return (
    <div>

      <div className="card-header">
        <h3>Danh Sách bài viết đã từ chối</h3>
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
                <th>Bút danh</th>
                <th>Thể loại</th>
                <th>Chuyên mục đăng</th>
                <th>Ngày viết</th>
                <th>Ngày duyệt</th>
                <th>Xem bài</th>
              </tr>
            </thead>
            <tbody>
              {news
              .filter(val => {
                if(search == ""){
                  return val;
                }
                
                if(currentFilter === "1"){
                  if(val._doc.title.toLowerCase().includes(search.toLowerCase())){
                    return val;
                  }
                }
  
                if(currentFilter === "2"){
                  if(val._doc.author.toLowerCase().includes(search.toLowerCase())){
                    return val;
                  }
                }
                if(currentFilter === "3"){
                  if(val.nameKind)
                    if(val.nameKind.toLowerCase().includes(search.toLowerCase())){
                      return val;
                    }
                }
                
              })
              .map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item._doc.title}</td>
                  <td>{item._doc.author}</td>
                  <td>{item.nameKind}</td>
                  <td>{item.nameCategories}</td>
                  <td>
                    <Moment format="DD/MM/YYYY">{item._doc.date_submitted}</Moment>
                  </td>

                  <td>
                    <Moment format="DD/MM/YYYY">{item._doc.date_BTV}</Moment>
                  </td>

                  <td>
                    <Link to={`${props.path}/news/views/${item._doc._id}`}>
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
