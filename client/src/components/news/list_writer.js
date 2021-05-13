import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Moment from "react-moment";
import { BsPencil } from "react-icons/bs";
import { BsTrashFill} from "react-icons/bs";
import { toast } from "react-toastify";

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
		id: "5",
		value: "yêu cầu chỉnh sửa",
	},
	{
		id: "0",
		value: "đã bị từ chối",
	},
 
];

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

	const [search, setSearch] = useState("");

	const [news, setNews] = useState([]);
	const [message, setMessage] = useState();
	const [currentFilter1, setCurrentFilter1] = useState("1");
	useEffect(async () => {
		const id = localStorage.getItem("idUser");
		const res = await axios.get(`/api-news/view-writer?id=${id}`, {
			id: localStorage.getItem("idUSer"),
		});
		setNews(res.data.arrNews);
		if (res.data.arrNews.length > 0) {
			setNews(res.data.arrNews);
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
				return "Đã được đăng";
			case "5":
				return "Yêu cầu chỉnh sửa";
			case "6":
				return "Biên tập viên đang chỉnh sửa bài viết";
			default:
				return "Đã từ chối";
		}
	};


	const show_item_after_delete = () => {
		setTimeout(() => {
			const id = localStorage.getItem("idUser");
			axios.get(`/api-news/view-writer?id=${id}`, {
				id: localStorage.getItem("idUSer"),
			})
			.then(
				res => {
					console.log(res.data.arrNews);
					if (res.data.arrNews) {
						setNews(res.data.arrNews);
					} else {
						setMessage(res.data.message);
					}
						}
				)
			
		}, 100);
	};

	let Remove = (id) => {
		if(window.confirm("Bạn chắc chắn muốn xóa bài viết này")){
			axios.delete(`/api-news/remove/${id}`).then((res) => {
				toast.success(res.data.message);
				show_item_after_delete();
			});
		}
	};

	const [currentFilter, setCurrentFilter] = useState("-1");

	return (
		<div>
			<div className="card-header">
				<h3>Danh sách bài viết</h3>
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
							onChange={(e) => { setCurrentFilter1(e.target.value)}}
						>
							{listSearch.map((status) => (
								<option value={status.id}>{status.value}</option>
							))}
					</select>
				</div>
					
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
								<th>Loại tin</th>
								<th>Chuyên mục đăng</th>
								<th>Ghi chú</th>
								<th>Xem</th>
								<th>Sửa</th>
								<th>Xóa</th>
							</tr>
						</thead>
						<tbody>
							{news
							.filter(val => {
								if(search == ""){
									return val;
								}
								
								if(currentFilter1 === "1"){
									if(val._doc.title.toLowerCase().includes(search.toLowerCase())){
										return val;
									}
								}

								if(currentFilter1 === "2"){
									if(val.nameAuthor.toLowerCase().includes(search.toLowerCase())){
										return val;
									}
								}

								if(currentFilter1 === "3"){
									if(val.nameKind){
										if(val.nameKind.toLowerCase().includes(search.toLowerCase())){
											return val;
										}
									}
									
								}
								
							})
							.filter((item) => {
								if (currentFilter === "-1") return item;
								return item._doc.status === currentFilter;
							})
							.map((item, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
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
									<td>{getStatus(item._doc.status)}</td>
									<td>{item.nameKind}</td>
									<td>{item.nameCategories}</td>
									<td style={{
												maxWidth: "180px",
												overflowWrap: "break-word",
											}}>
												{item._doc.note}
									</td>
									<td>
										<Link to={`${props.path}/news/views/${item._doc._id}`}>
											Xem thử
										</Link>
									</td>
									<td>
										{(item._doc.status === "1" || item._doc.status === "5") ? (
											<Link to={`${props.path}/news/${item._doc._id}`}>
												<BsPencil />
											</Link>
										) : (
											"Không thể sửa"
										)}
									</td>

									<td>
										{(item._doc.status === "1" || item._doc.status === "5") ? (
											<span onClick={() => Remove(item._doc._id)}>
											<BsTrashFill/>
											</span>
										) : (
											"Không thể  xóa"
										)}
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
