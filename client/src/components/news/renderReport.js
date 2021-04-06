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
        const res = await axios.post("http://3.130.135.8/api/api-news/statisticalByAuthor", {
          month: this.state.month || moment(),
        });
        this.setState({ ...this.state, news: res.data.News });
      };

      fetchData();
    }
  }

  componentDidMount() {
    const fetchData = async () => {
      const res = await axios.post("http://3.130.135.8/api/api-news/statisticalByAuthor", {
        month: this.state.month || moment(),
      });
      this.setState({ ...this.state, news: res.data.News });
    };

    fetchData();
  }
  
  state = {
    month: moment(),
    news: [],
  };

  render() {
    const { month, news } = this.state;

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
                <th>STT</th>
                <th>Tiêu đề</th>
                <th>Ngày viết</th>
                <th>Bút danh</th>
                <th>Loại tin</th>
                <th>Chuyên mục</th>
                <th>Tiền tin</th>
                <th>Ghi chú</th>
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
                      <td>{item._doc.author}</td>

                      <td>{item._doc.kindNews}</td>
                      <td>{item._doc.categories}</td>
                      <td>
                        {item.price.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>

                      <td>{item._doc.note}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default RenderReport;
