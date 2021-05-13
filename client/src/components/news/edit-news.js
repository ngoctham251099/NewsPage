import React, { useState } from "react";
import axios from "axios";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

import Input from "../UI/Input";
import Button from "../UI/button-add";
import { useEffect } from "react/cjs/react.development";
import ButtonUpload from "../UI/Button";
import { useHistory } from "react-router-dom";
import Select2 from "../UI/select2";
import {
	CTV_ROLE,
	ADMIN_ROLE,
	TRUONG_BAN_BT_ROLE,
	BAN_BT_ROLE,
	THU_KY_ROLE,
} from "../../config/roles";
import { toast } from "react-toastify";
import Switch from "react-switch";

const useStyles1 = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: "100ch",
		},
	},
}));

const BootstrapInput = withStyles((theme) => ({
	root: {
		'label + &': {
			margin: '8px 0px',
		},
	},
	input: {
		borderRadius: 4,
		position: 'relative',
		backgroundColor: theme.palette.background.paper,
		border: '1px solid #ced4da',
		fontSize: 16,
		padding: '10px 26px 10px 12px',
		transition: theme.transitions.create(['border-color', 'box-shadow']),
		// Use the system font instead of the default Roboto font.
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		'&:focus': {
			borderRadius: 4,
			borderColor: '#80bdff',
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
		},
	},
}))(InputBase);

const useStyles = makeStyles((theme) => ({
	margin: {
		margin: '8px 0px',
		width: "99%"
	},
}));

export default function EditNews(props) {
	const { role } = props;
	const classes = useStyles();
	const [priceOfKind, setPriceOfKind] = useState([]);
	const [kindOfImages, setKindOfImages] = useState([]);

	let history = useHistory();
	const [news, setNews] = useState({
		title: "",
		content: "",
		author: "",
		status: "",
		avatar: "",
		kindNews: "",
		idPriceOfKind:'',
		images: "",
		note: "",
		categories: "",
		summary: "",
		isPostedFanpage: false,
		kindOfImages: "",
	});

	const [listKind, setListKind] = useState([]);
	const [content, setContent] = useState("");
	const [categoryList, setCategoryList] = useState([]);
	const [arrImages, setArrImages] = useState([]);

	useEffect(() => {
		axios.get("/api-categories").then((res) => {
			setCategoryList(res.data.categories);
		});
	}, []);

	useEffect(() => {
		axios.get("/api-price-of-kind").then((res) =>
			setPriceOfKind(res.data.priceOfNews)
		);
	}, []);

	useEffect(() => {
    axios.get("/api-price-of-images").then((res) =>{
      console.log(res.data.kind)
      setKindOfImages(res.data.kind)
    });
  }, []);


	useEffect(async () => {
		const res = await axios.post(`/api-news/edit/${props.match.params.id}`, {
			id: props.match.params.id,
		});

		if (res.data.news) {
			setNews(res.data.news);
			setContent(res.data.news.content);
			setArrImages(res.data.news.images);
		}
	}, []);

	useEffect(() => {
		axios.get("/api-kind").then((res) => {
			console.log(res.data.kind);
			setListKind(res.data.kind);
		});
	}, []);

	const setStatus = (role) => {
		switch (role) {
			case BAN_BT_ROLE:
				return 2;
			case TRUONG_BAN_BT_ROLE:
				return 3;
			case THU_KY_ROLE:
			case ADMIN_ROLE:
				return 4;
			default:
				return 1;
		}
	};

	console.log(role);

	const submit = () => {
		const formData = new FormData();
		// const date_submitted = moment().subtract(10, 'days').calendar();
		formData.append("title", news.title);
		formData.append('power', localStorage.getItem("power"))
		formData.append("idPriceOfKind", news.idPriceOfKind);
		formData.append("content", news.content);
		formData.append("avatar", news.avatar);
		formData.append("department", news.department);
		formData.append("kindNews", news.kindNews);
		formData.append("summary", news.summary);
		formData.append("status", setStatus(role));
		formData.append("note", news.note);
		formData.append("isPostedFanpage", news.isPostedFanpage);
		formData.append('idUser', localStorage.getItem("idUser"))
		formData.append('kindOfImages', news.kindOfImages);

		if (news.categories) {
			formData.append("categories", news.categories);
		}
		axios
			.post(`/api-news/update/${props.match.params.id}`, formData)
			.then((res) => {
				if(res.data.message === "Cập nhật thành công"){
					toast.success("Thành công")
					const redirect = props.match.url.split("/");
					// history.push(`/${redirect[1] + "/" + redirect[2]}`);
					history.goBack();
				}else{
					toast.error(res.data.message)
				}
				
			});
	};

	const onChangeTitle = (event) => {
		console.log(event.target.value);
		setNews({ ...news, title: event.target.value });
	};

	const onChangeKind = (event) => {
		setNews({ ...news, kindNews: event.target.value });
	};

	const onChangeNote = (event) => {
		setNews({ ...news, note: event.target.value });
	};

	const onChangeContent = (event, editor) => {
		const data = editor.getData();
		setNews({ ...news, content: data });
	};

	const onChangeAvarta = (e) => {
		e.preventDefault();
		setNews({ ...news, avatar: e.target.files[0] });
	};

	const onChangeSummary = (event) => {
		setNews({ ...news, summary: event.target.value });
	};

	const onChangeKindImages = (event) => {
    setNews({ ...news, kindOfImages: event.target.value });
  };

	const onChangePrice = (e) => {
		setNews({ ...news, idPriceOfKind: e.target.value });
	};

	const updateRefuse = async () => {
		const id = localStorage.getItem("idUser");
		const res = await axios.post(
			`/api-news/update-refuse/${id}/${props.match.params.id}`,
		);
		if (res.data.message == "Đã từ chối duyệt tin") {
			toast.success(res.data.message);
			const redirect = props.match.url.split("/");
			history.push(`/${redirect[1] + "/" + redirect[2]}`);
		} else {
			toast.error(res.data.message);
		}
	};

	const updateEditContent = async () => {
		const id = localStorage.getItem("idUser");
		const res = await axios.post(
			`/api-news/news-edit-content/${id}/${props.match.params.id}`,
			{
				note: news.note
			}
		);
		if (res.data.message == "Yêu cầu chỉnh sửa thành công") {
			toast.success(res.data.message);
			const redirect = props.match.url.split("/");
			//history.push(`/${redirect[1] + "/" + redirect[2]}`);
			history.goBack();
		} else {
			toast.error(res.data.message);
		}
	};

	return (
		<div className="create-user-wrapper">
			<h3 style={{ marginBottom: 20 }}>Cập nhật tin</h3>
			<form className={classes.root} noValidate autoComplete="off">

				<div className="item">
					<label className="title-news">Tiêu đề</label>
					<Input value={news.title} onChange={onChangeTitle}></Input>
				</div>

				<div className="item">
					<label>Thumbnail</label>
					<div>
						<img width="100px" src={`/api-news/viewFile/${news.avatar}`}></img>
					</div>
					<Input onChange={onChangeAvarta} type="file"></Input>
				</div>

				<div className="item">
					<label>Tóm tắt</label>
					<Input value={news.summary} onChange={onChangeSummary}></Input>
				</div>

				<div>
					<CKEditor
						data={content.toString()}
						editor={ClassicEditor}
						onChange={onChangeContent}
						config={{
							ckfinder: {
								// The URL that the images are uploaded to.
								uploadUrl: "/api-news/upload",
							},
						}}
						onReady={(editor) => {
							// You can store the "editor" and use when it is needed.
							console.log("Editor1 is ready to use!" + news.content, editor);
						}}
					/>
				</div>

				{role !== CTV_ROLE && (
					<div className="item">
						<label
							className="title-news"
							style={{
								marginRight: "12px",
							}}
						>
							Đăng lên fanpage?
						</label>
						<Switch
							disabled={role !== ADMIN_ROLE && role !== TRUONG_BAN_BT_ROLE }
							className="statusToggle"
							onChange={(checked) =>
								setNews({ ...news, isPostedFanpage: checked })
							}
							checked={news.isPostedFanpage}
							width={83}
							onColor="#f6f6f6"
							offColor="#F9F1F1"
							onHandleColor="#7cc353"
							offHandleColor="#E05460"
							border="1px solid"
							checkedIcon={
								<div
									style={{
										fontSize: 11,
										color: "#565656",
										height: "100%",
										justifyContent: "center",
										alignItems: "center",
										display: "flex",
										marginLeft: 10,
										fontWeight: 500,
									}}
								>
									Có
								</div>
							}
							uncheckedIcon={
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										height: "100%",
										fontSize: 11,
										fontWeight: 500,
										paddingRight: 20,
										color: "#CD5966",
									}}
								>
									Không
								</div>
							}
						/>
					</div>
				)}

				{role !== CTV_ROLE  && (
					<div className="item">
						<label className="title-news">Thể loại</label>
						<Select2
							value={news.kindNews}
							list={listKind}
							onChange={onChangeKind}
						></Select2>
					</div>
				)}

				{role !== CTV_ROLE && (
          <div className="item">
            <label className="title-news">Loại ảnh<p style={{color: "#ff0000"}}> (nếu loại tin là Bài viết tin/ Ảnh)</p></label>
            <Select2
              value={news.kindOfImages}
              list={kindOfImages}
              onChange={onChangeKindImages}
            ></Select2>
          </div>
        )}

				{role !== CTV_ROLE && (
					<div>
						<label>Chất lượng loại tin</label>
						<FormControl className={classes.margin}>
							<Select
								id="demo-customized-select"
								value={news.idPriceOfKind}
								onChange={onChangePrice}
								input={<BootstrapInput />}
							>
							{priceOfKind.filter(item => {
							if(news.kindNews == -1){ 
								return '';
							}
								return String(item.idKind) === news.kindNews;
							}).map(item => {
								return (<MenuItem value={item._id}>{item.name}</MenuItem>)
							})}
							</Select>
						</FormControl>
				</div>
				)}

					<div className="item">
						<label className="title-news">Chuyên mục đăng tin</label>
						<Select2
							value={news.categories}
							list={categoryList}
							onChange={(e) => setNews({ ...news, categories: e.target.value })}
						></Select2>
					</div>

				{role !== CTV_ROLE && (
					<div className="item">
						<label className="title-news">Ghi chú</label>
						<Input value={news.note} onChange={onChangeNote}></Input>
					</div>
				)}

				<div
					className="item"
					style={{
						display: "flex",
						justifyContent: "center",
					}}
				>
					<span style={{ padding: 5 }}>
						<Button
							onClick={submit}
							title={(role === BAN_BT_ROLE || role === TRUONG_BAN_BT_ROLE)  ? `Cập nhật và phê duyệt` : `Cập nhật`}
						></Button>
					</span>

					{role === BAN_BT_ROLE && (
						<span style={{ padding: 5 }}>
							<Button
								onClick={updateEditContent}
								title="Yêu cầu chỉnh sửa"
								color="secondary"
							></Button>
						</span>
					)}

					{role === TRUONG_BAN_BT_ROLE && (
						<span style={{ padding: 5 }}>
							<Button
								onClick={updateEditContent}
								title="Yêu cầu chỉnh sửa"
								color="secondary"
							></Button>
						</span>
					)}

					{role === BAN_BT_ROLE && (
						<span style={{ padding: 5 }}>
							<Button
								onClick={updateRefuse}
								title="Từ chối phê duyệt"
								color="error"
							></Button>
						</span>
					)}

					{role === TRUONG_BAN_BT_ROLE && (
						<span style={{ padding: 5 }}>
							<Button
								onClick={updateRefuse}
								title="Từ chối phê duyệt"
								color="error"
							></Button>
						</span>
					)}
				</div>
			</form>
		</div>
	);
}
