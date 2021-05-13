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

]

export default function ListEditor(props) {
  let stt = 1;

  const [listKind, setListKind] = useState([]);
  const [search, setSearch] = useState("");
  const [currentFilter, setCurrentFilter] = useState("1");

  const [news, setNews] = useState([]);
  useEffect(async () => {
    const id = localStorage.getItem("idUser");
    const res = await axios.get(`/api-news/list-news-request-edit?id=${id}`, {
      id: localStorage.getItem("idUSer"),
    });
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
        <h3>Danh Sách Bài Viết Yêu Cầu Chỉnh Sửa</h3>
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
							onChange={(e) => {console.log(e.target.value); setCurrentFilter(e.target.value)}}
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
                <th>Chuyên mục đăng</th>
                <th>Ghi chú</th>
                <th>Xem bài</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {news? news
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
                  if(val.nameAuthor.toLowerCase().includes(search.toLowerCase())){
                    return val;
                  }
                }
                if(currentFilter === "3"){
                  if(val.nameKind.toLowerCase().includes(search.toLowerCase())){
                    return val;
                  }
                }
                
              })
              .map((item, index) => (
                <tr key={index}>
                  <td>{index + 1  }</td>
                  <td style={{
												maxWidth: "180px",
												overflowWrap: "break-word",
											}}>{item._doc.title}</td>
                  <td>
                    <img
                      width={150}
                      src={`/api-news/viewFile/${item._doc.avatar}`}
                    ></img>
                  </td>
                  <td>{item.nameAuthor}</td>
                  <td>
                    <Moment format="DD/MM/YYYY">{item._doc.date_submitted}</Moment>
                  </td>
                  <td>{item.nameCategories}</td>
                  <td style={{
												maxWidth: "180px",
												overflowWrap: "break-word",
											}}>{item._doc.note}</td>
                  <td>
                    <Link to={`${props.path}/news/views/${item._doc._id}`}>
                      Xem thử
                    </Link>
                  </td>

                  <td style={{ width: 120 }}>
                    <span style={{ padding: "5px" }}>
                      <Link to={`${props.path}/news/${item._doc._id}`}>
                          Chỉnh sửa và phê duyệt
                      </Link>
                    </span>
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
