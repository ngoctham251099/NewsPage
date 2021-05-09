import React, { useEffect, useState } from "react";
import axios from "axios";
import Moment from "react-moment";
import { BsTrashFill } from "react-icons/bs";
import { BsPencil, BsCheck, BsX} from "react-icons/bs";
import { toast } from "react-toastify";

import { useHistory, Link } from "react-router-dom";

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
		id: "6",
		value: "đang chỉnh sửa bởi biên tập viên",
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
function ListNews(props) {
  let history = useHistory();
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  let stt = 1;
  useEffect(() => {
    axios.get("/api-news/").then((res) => {
      console.log(res.data.page )
      setNews(res.data.page);
    });
  }, []);

  const [currentFilter, setCurrentFilter] = useState("-1");
  const [currentFilter1, setCurrentFilter1] = useState("1");

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
      axios.get(`/api-news`).then((res) => {
        // history.push(`${props.path}/news`)
        setNews(res.data.page);
      });
    }, 100);
  };

  let Remove = (id) => {
    if(window.confirm("Bạn chắc chắn muốn xóa bài viết này?")){
      axios.delete(`/api-news/remove/${id}`).then((res) => {
        toast.success(res.data.message);
        show_item_after_delete();
      });
    }
  };

  return (
    <div>
      <div className="card-header">
        <h3>
          Danh sách bài viết
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
          <input style={{
          padding: ".5rem",
          outline: "none",
          border: "1px solid",
          width: "600px",
          marginLeft: "10rem"
        }} type="text" placeholder="Tìm kiếm theo tiêu đề bài viết" onChange={(e) => {setSearch(e.target.value)}}></input>
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
        </h3>
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
                <th>Ngày đăng</th>
                <th>Trạng thái</th>
                <th>Thể loại</th>
                <th>Chuyên mục</th>
                <th>Loại tin</th>
                <th>Đăng Fanpage</th>
                <th>Xem</th>
                <th>Sửa</th>
                <th>Xóa</th>
                <th>Ghi chú</th>
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
                    if(val._doc.author.toLowerCase().includes(search.toLowerCase())){
                      return val;
                    }
                  }

                  if(currentFilter1 === "3"){
                    if(val.nameKind.toLowerCase().includes(search.toLowerCase())){
                      return val;
                    }
                  }
                  
                })
                .filter((item) => {
                  if (currentFilter === "-1") return item;
                  return item._doc.status === currentFilter;
                })
                .map((item) => (
                  <tr key={item._doc._id}>
                    <td>{stt++}</td>
                    <td
                      style={{
                        maxWidth: "180px",
                        overflowWrap: "break-word",
                      }}
                    >
                      {item._doc.title}
                    </td>
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
                    <td>{
                      item._doc.date_post ? <Moment format="DD/MM/YYYY">{item._doc.date_post}</Moment> : null
                      }</td>
                    <td>{getStatus(item._doc.status)}</td>
                    {/* <td>{item._doc.status}</td> */}
                    <td>{item.nameKind}</td>
                    <td>{item.nameCategories}</td>
                    <td>{item.namePriceOfNews}</td>
                    <td>
                    {item._doc.isPostedFanpage ? <BsCheck color="green" /> :<BsX color="red" />}
                    </td>
                    <td>
                      <Link to={`${props.path}/news/views/${item._doc._id}`}>
                        Xem thử
                      </Link>
                    </td>
                    
                    <td>
                      <Link to={`${props.path}/news/${item._doc._id}`}>
                        <BsPencil />
                      </Link>
                    </td>
                    <td>
                      <span onClick={() => Remove(item._doc._id)}>
                        <BsTrashFill />
                      </span>
                    </td>
                    <td
                    style={{
                      maxWidth: "180px",
                      overflowWrap: "break-word",
                    }}
                    >{item._doc.note}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListNews;
