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
				const res = await axios.post("/api-news/statisticalByDepartment", {
					month: this.state.month || moment(),
				});
				this.setState({ ...this.state, news: res.data.News });
        this.setState({ ...this.state, sumByKind: res.data.sumByKind });
        this.setState({ ...this.state, sumAll: res.data.sumAll });
			};

			fetchData();
		}
	}

	componentDidMount() {
		const fetchData = async () => {
			const res = await axios.post("/api-news/statisticalByDepartment", {
				month: this.state.month || moment(),
			});
			this.setState({ ...this.state, news: res.data.News });
      this.setState({ ...this.state, sumByKind: res.data.sumByKind });
      this.setState({ ...this.state, sumAll: res.data.sumAll });
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
		kind:[],
		department: [],
    sumByKind: [],
    sumAll: ''
	};
	

	render() {
		const { month, news, kind, sumByKind , sumAll} = this.state;

		return (
			<div className="card-body">
				<div className="table-responsive">
					<h3
						style={{
							display: "flex",
							alignItems: "center",
						}}
					>
						Thống kê bài viết theo phòng ban{" "}
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
								<th>STT</th>
								<th>Họ tên</th>
								{kind ? kind.map((item, index) => (
									<th key={index}>{item.name}</th>
								) ): null}
								<th>Ghi chú</th>
							</tr>
						</thead>
						<tbody>
							{news
								? news
								.sort()
								.map((item, index) => (
										<tr key={index}>
											<td>{index + 1}</td>
											<td>{item.department.name} </td>
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
												</>
											))}
											<td>{item.note}</td>
										</tr>
									))
							: null}
              <td colSpan="2">Tổng cộng</td>
              {sumByKind ? sumByKind.map(item => (
                <>
                  
                  <td>{item.count}</td>
                </>
              )):null}
              <td>{sumAll}</td>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default RenderReport;
