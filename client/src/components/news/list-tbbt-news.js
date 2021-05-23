import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Moment from "react-moment";
import { toast } from "react-toastify";
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

export default function ListEditor(props) {
	let history = useHistory();
	let stt = 1;

	const [listKind, setListKind] = useState([]);
	const [search, setSearch] = useState("");
  const [currentFilter, setCurrentFilter] = useState("1");
	const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

	const [news, setNews] = useState([]);
	useEffect(async () => {
		const id = localStorage.getItem("idUser");
		console.log(id)
		const res = await axios.get(`/api-news/list-tbbt-approved?id=${id}`);
		if (res.data.listNews) {
			setNews(res.data.listNews);
			setTotalPages(Math.ceil(res.data.listNews.length / NEWS_PER_PAGE))
		} else {
			toast.error(res.data.message);
		}
	}, []);

	const startIndex = (page - 1) * NEWS_PER_PAGE;
  const selectedNews = news.slice(startIndex, startIndex + NEWS_PER_PAGE)

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

	const handleClick = num => {
    setPage(num)
  }

	return (
	<div>
		<div className="card-header">
			<h3>Danh Sách bài viết đã duyệt</h3>
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
							<th>Bút danh</th>
							<th>Thể loại</th>
							<th>Chuyên mục đăng</th>
							<th>Ngày viết</th>
							<th>Ngày duyệt</th>
							<th>Xem bài</th>
						</tr>
					</thead>
					<tbody>
						{selectedNews ? 
						selectedNews
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
								<td>{item.nameAuthor}</td>
								<td>{item.nameKind}</td>
								<td>{item.nameCategories}</td>
								<td>
									<Moment format="DD/MM/YYYY">{item._doc.date_submitted}</Moment>
								</td>
								<td>
									<Moment format="DD/MM/YYYY">{item._doc.date_TBBT}</Moment>
								</td>
								<td>
									<Link to={`${props.path}/news/views/${item._doc._id}`}>
										Views
									</Link>
								</td>
							</tr>
						)): null}
					</tbody>
				</table>
				<Pagination totalPages = {totalPages} handleClick={handleClick}/>
			</div>
		</div>
	</div>
	);
}
