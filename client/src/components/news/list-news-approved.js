import React, { useEffect, useState } from "react";
import axios from "axios";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import {NEWS_PER_PAGE} from "../../config/contants";
import Pagination from "../pagination/Pagination";

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

function ListNews(props) {
  const [news, setNews] = useState([]);
  const [images, setImages] = useState();
  const [search, setSearch] = useState("");
  const [currentFilter, setCurrentFilter] = useState("1");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    axios.get("/api-news/list-news-approved").then((res) => {
      setNews(res.data.listNewsApproved);
      setImages(res.data.images);
      setTotalPages(Math.ceil(res.data.listNewsApproved.length / NEWS_PER_PAGE))
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

  const startIndex = (page - 1) * NEWS_PER_PAGE;
  const selectedNews = news.slice(startIndex, startIndex + NEWS_PER_PAGE)
  

  const handleClick = num => {
    setPage(num)
  }

  return (
    <div>
      <div className="card-header">
        <h3>Danh sách tin chờ đăng</h3>
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
                <th>Thể loại</th>
                <th>Chuyên mục đăng</th>
                <th>Ngày viết</th>
                <th>Xem thử</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {selectedNews
                ? selectedNews
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
                  
                })
                .map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item._doc.title}</td>
                      <td>
                        <img
                          width={150}
                          src={`/api-news/viewFile/${item._doc.avatar}`}
                        ></img>
                      </td>
                      <td>{item.nameAuthor}</td>
                      <td>{item.nameKind}</td>
                      <td>{item.nameCategories}</td>
                      <td>
                        <Moment format="DD/MM/YYYY">
                          {item._doc.date_submitted}
                        </Moment>
                      </td>

                      <td>
                        <Link to={`${props.path}/news/views/${item._doc._id}`}>
                          Xem thử
                        </Link>
                      </td>
                      <td>
                        <Link to={`${props.path}/news/${item._doc._id}`}>
                          Chỉnh sửa và đăng tin
                        </Link>
                      </td>
                    </tr>
                  ))
                : <tr><td colSpan="9" style={{paddingTop: 12}}>Không có tin nào chờ đăng</td></tr>}
            </tbody>
          </table>
          <Pagination totalPages = {totalPages} handleClick={handleClick}/>
        </div>
      </div>
    </div>
  );
}

export default ListNews;
