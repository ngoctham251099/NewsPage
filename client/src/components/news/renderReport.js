import React from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import Moment from "react-moment";
import axios from "axios";

class RenderReport extends React.Component {
	componentDidUpdate(prevProps, prevState) {
		if (prevState.month !== this.state.month) {
			const fetchData = async () => {
				const res = await axios.post("/api-news/statisticalByAuthor", {
					month: this.state.month || moment(),
				});
				this.setState({ ...this.state, news: res.data.News });
			};

			fetchData();
		}
	}

	componentDidMount() {
		const fetchData = async () => {
			const res = await axios.post("/api-news/statisticalByAuthor", {
				month: this.state.month || moment(),
			});
			this.setState({ ...this.state, news: res.data.News });
		};

		console.log(this.state.news)

		fetchData();
	}

	
	state = {
		month: moment(),
		news: [],
	};
	

	render() {
		const { month, news } = this.state;
		let count1 = this.state.news.reduce((a, b) => {
				return a + Number(b.price)
		},0)

		let count2 = this.state.news.reduce((a, b) => {
			return a + Number(b.priceImages)
		},0)

		console.log(this.state.month.format("MM"))

		return (
			<div className="card-body">
				<div className="table-responsive">
					<h3
						style={{
							display: "flex",
							alignItems: "center",
						}}
					>
						Thống kê bài viết theo bài viết{" "}
						<span style={{ marginLeft: 12 }}>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<DatePicker
									variant="inline"
									openTo="year"
									views={["year", "month"]}
									value={month}
									onChange={(e) => this.setState({ ...this.state, month: e })}
								/>
							</MuiPickersUtilsProvider>
						</span>
					</h3>
					<br></br>
					<div className="title-report" 
						style={{display:"flex",
										justifyContent:"space-between",
					}}>
						<div className="title-left"
							style={{
								marginLeft:"5rem",
								textAlign: "center"
							}}
						>
							<p>SỞ THÔNG TIN VÀ TRUYỀN THÔNG</p>
							<p><b>BAN BIÊN TẬP SỞ TRUYỀN THÔNG</b></p>
							<hr style={{width:"7rem", margin:"auto"}}></hr>
						</div>
						<div className="title-right" style={{
							marginRight:"5rem",
							textAlign: "center",
						}}>
							<p><b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b></p>
							<p><b> Độc lập - Tự do - Hạnh phúc </b></p>
							<hr style={{width:"7rem", margin:"auto"}}></hr>
						</div>
					</div>

					<div className="title-center" style={{
						textAlign: "center	"
					}}>
						<p><b>BẢNG NHUẬN BÚT THÁNG {this.state.month.format('MM')} NĂM {this.state.month.format("YYYY")}</b></p>
						<p><b>TIN CUNG CẤP CHO CỔNG THÔNG TIN ĐIỆN TỬ SỞ TT&TT</b></p>
						{/* <p>(Từ {moment().clone().startOf(this.state.month).format("DD/MM/YYYY")} đến {moment().clone().endOf(this.state.month).format("DD/MM/YYYY")})</p> */}
					</div>


					<table
						width="100%"
						style={{ marginTop: 16 }}
						className="table-bordered"
					>
						<thead>
							<tr>
								<th>STT</th>
								<th>Tiêu đề</th>
								<th>Ngày viết</th>
								<th>Bút danh</th>
								<th>Thể loại</th>
								<th>Chuyên mục</th>
								<th>Tiền tin</th>
								<th>Tiền ảnh</th>
								{/* <th>Ghi chú</th> */}
							</tr>
						</thead>
						<tbody>
							{news
								? news.map((item, index) => (
										<tr key={item._doc._id}>
											<td>{index + 1}</td>
											<td>{item._doc.title}</td>
											<td>
												<Moment format="DD/MM/YYYY">
													{item._doc.date_submitted}
												</Moment>
											</td>
											<td>{item.nameAuthor}</td>

											<td>{item.nameKind}</td>
											<td>{item.nameCategory}</td>
											<td>
												{item.price.toLocaleString("it-IT", {
																	style: "currency",
																	currency: "VND",
																})}
											</td>
											<td>{item.priceImages.toLocaleString("it-IT", {
																	style: "currency",
																	currency: "VND",
																})}</td>
														</tr>
													))
												: null}
											
								<tr>
									<td colSpan="6">Tổng tiền: </td>
									<td>{count1.toLocaleString("it-IT", {
																	style: "currency",
																	currency: "VND",
																})}</td>
									<td>{count2.toLocaleString("it-IT", {
																	style: "currency",
																	currency: "VND",
																})}</td>
								</tr>
						</tbody>
					</table>
					<br></br>
					<div className="footer-report" style={{
						display: "flex",
						justifyContent: "space-between"
					}}>
						<p style={{
								marginLeft:"5rem",
								textAlign: "center"
							}}><b>Kế toán</b></p>
						<p><b>Người lập phiếu</b></p>
						<div style={{
								marginRight:"5rem",
								textAlign: "center"
							}}>
							<p><b>Duyệt</b></p>
							<p><b>TRƯỞNG BAN BIÊN TẬP</b></p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default RenderReport;
