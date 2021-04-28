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
				const res = await axios.get("/api-news/statisticalByAuthor2", {
					month: this.state.month || moment(),
				});
				this.setState({ ...this.state, news: res.data.News });
			};

			fetchData();
		}
	}

	componentDidMount() {
		const fetchData = async () => {
			const res = await axios.get("/api-news/statisticalByAuthor2", {
				month: this.state.month || moment(),
			});
			this.setState({ ...this.state, news: res.data.News });
		};

		const fetchKind = async () => {
			const res = await axios.get("/api-kind");
			this.setState({ ...this.state, kind: res.data.kind });
		};

		fetchKind();
		fetchData();
	}
	
	state = {
		month: moment(),
		news: [],
	};
	

	render() {
		const { month, news, kind } = this.state;
		let count1 = this.state.news.reduce((a, b) => {
				return a + Number(b.price)
		},0)

		let count2 = this.state.news.reduce((a, b) => {
			return a + Number(b.priceImages)
		},0)

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
								<th>Ghi chú</th>
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
								? news.map((item, index) => (
										<tr key={index}>
											<td>{index + 1}</td>
											<td>{item.username}</td>
											{item.newsArr.map(val => (
												<>
													<td>{val.count}</td>
													<td>{val.price}</td>
												</>
											))}
											
										</tr>
									))
							: null}
											
								<tr>
									<td colSpan="9">Tổng tiền: </td>
									<td>{count1}</td>
									<td>{count2}</td>
								</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default RenderReport;
