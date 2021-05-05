import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
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
	{
		id: "3",
		value: "Loại tin"
	},

]



export default function ListEditor(props) {
	let history = useHistory();
	let stt = 1;

	const [listKind, setListKind] = useState([]);
	const [search, setSearch] = useState("");
  const [currentFilter, setCurrentFilter] = useState("1");

	const [news, setNews] = useState([]);
	useEffect(async () => {
		const id = localStorage.getItem("idUser");
		console.log(id)
		const res = await axios.get(`/api-news`);
		if (res.data.page) {
			setNews(res.data.page);
		} else {
			toast.error(res.data.message);
		}
	}, []);

	useEffect(() => {
		axios.get("/api-kind").then((res) => {
			setListKind(res.data.kind);
		});
	}, []);

	return (
	<div>
		<div className="card-header">
			<h3>Danh Sách bài viết đã đăng</h3>
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
								if(val.nameKind.toLowerCase().includes(search.toLowerCase())){
									return val;
								}
							}
							
						})
            .filter((item) => {
              return item._doc.status === "4";
            })
						.map((item) => (
							<tr key={item._doc._id}>
								<td>{stt++}</td>
								<td>{item._doc.title}</td>
								<td>
									<img
										width={150}
										src={`/api-news/viewFile/${item._doc.avatar}`}
									></img>
								</td>
								<td>{item._doc.author}</td>
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
						))}
					</tbody>
				</table>
			</div>
		</div>
	</div>
	);
}
