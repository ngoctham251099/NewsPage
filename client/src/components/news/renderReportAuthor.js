import React from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import axios from "axios";

class RenderReport extends React.Component {
	componentDidUpdate(prevProps, prevState) {
		if (prevState.month !== this.state.month) {
			const fetchData = async () => {
				const res = await axios.post("/api-news/statisticalByAuthor2", {
					month: this.state.month || moment(),
				});
				this.setState({ ...this.state, news: res.data.News });
				this.setState({ ...this.state, sumBykind: res.data.sumBykind });
				this.setState({ ...this.state, sumAll: res.data.sumAll });
			};

			fetchData();
		}
	}

	componentDidMount() {
		const fetchData = async () => {
			const res = await axios.post("/api-news/statisticalByAuthor2", {
				month: this.state.month || moment(),
			});
			this.setState({ ...this.state, news: res.data.News });
			this.setState({ ...this.state, sumBykind: res.data.sumByKind });
			this.setState({ ...this.state, sumAll: res.data.sumAll });
		};


		const fetchKind = async () => {
			const res = await axios.get("/api-kind");
			this.setState({ ...this.state, kind: res.data.kind });
		};

		const fetchUser = async () => {
			const res = await axios.get("/api-user");
			this.setState({ ...this.state, user: res.data.user });
		};
		fetchUser();
		fetchKind();
		fetchData();
	}

	state = {
		month: moment(),
		news: [],
		kind:[],
		user: [],
		sumBykind: [],
		sumAll: []
	};
	

	render() {
		const { month, news, kind, sumBykind, sumAll } = this.state;
		return (
			<div className="card-body">
				<div className="table-responsive">
					<h3
						style={{
							display: "flex",
							alignItems: "center",
						}}
					>
						Thống kê bài viết theo tác giả{" "}
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

					<table
						width="100%"
						style={{ marginTop: 16 }}
						className="table-bordered"
					>
						<thead>
							<tr>
								<th rowspan="2">STT</th>
								<th rowspan="2">Họ tên</th>
								{kind ? kind.map((item, index) => (
									<th key={index} colSpan="2">{item.name}</th>
								) ): null}
								<th rowSpan="2">Tổng tiền</th>
								<th rowSpan="2">Ghi chú</th>
							</tr>
							<tr>
								{kind ? kind.map(val => {
									return (
										<>
											<td>sl</td>
											<td>Tiền</td>
										</>
									)
								}):null}
							</tr>
						</thead>
						<tbody>
							{news
								? news
								.sort()
								.map((item, index) => (
										<tr key={index}>
											<td>{index + 1}</td>
											<td>{item.user.username} </td>
											{item.news
											.sort(function(a, b) {
												var nameA = a.nameKind
												var nameB = b.nameKind
												if (nameA < nameB) {
													return -1;
												}
												if (nameA > nameB) {
													return 1;
												}
											
												// name trùng nhau
												return 0;
											})
											.map(val => (
												<>
													<td>{val.count}</td>
													<td>{val.price.toLocaleString("it-IT", {
																	style: "currency",
																	currency: "VND",
																})}</td>
												</>
											))}
											<td>{item.sum.toLocaleString("it-IT", {
																	style: "currency",
																	currency: "VND",
																})}</td>
											<td></td>
										</tr>
									))
							: null}
							<td colSpan="2">Tổng cộng</td>
							{sumBykind ? sumBykind.map(item => (
								<>
									<td>{item.count}</td>
									<td>{item.sumPrice.toLocaleString("it-IT", {
																	style: "currency",
																	currency: "VND",
																})}</td>
								</>
							)):null}
							<td>{sumAll.toLocaleString("it-IT", {
																	style: "currency",
																	currency: "VND",
																})}</td>
							<td></td>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default RenderReport;
