import React, { useState } from "react";
import axios from "axios";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { makeStyles } from "@material-ui/core/styles";
import Input from "../UI/Input";
import Button from "../UI/button-add";
import Select from "../UI/select";
import { useEffect } from "react/cjs/react.development";
import ButtonUpload from "../UI/Button";
import { useHistory } from "react-router-dom";
import {
  CTV_ROLE,
  ADMIN_ROLE,
  TRUONG_BAN_BT_ROLE,
  BAN_BT_ROLE,
  THU_KY_ROLE,
} from "../../config/roles";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100ch",
    },
  },
}));

export default function EditNews(props) {
  const { role } = props;

  let history = useHistory();
  const [news, setNews] = useState({
    title: "",
    content: "",
    author: "",
    status: "",
    avatar: "",
    kindNews: "",
    images: "",
    note: "",
    categories: "",
    summary: "",
  });

  const [listKind, setListKind] = useState([]);
  const [content, setContent] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [arrImages, setArrImages] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1/api/api-categories").then((res) => {
      setCategoryList(res.data.categories);
    });
  }, []);

  useEffect(async () => {
    const res = await axios.post(`http://127.0.0.1/api/api-news/edit/${props.match.params.id}`, {
      id: props.match.params.id,
    });

    if (res.data.news) {
      setNews(res.data.news);
      setContent(res.data.news.content);
      setArrImages(res.data.news.images);
    } else {
      console.log("jhedjshzb");
    }
  }, []);

  useEffect(() => {
    axios.get("http://127.0.0.1/api/api-kind").then((res) => {
      console.log(res.data.kind);
      setListKind(res.data.kind);
    });
  }, []);

  const [power, setPower] = useState([
    { id: 1, value: "Chờ phê duyệt" },
    { id: 2, value: "Đã xác nhận" },
    { id: 3, value: "Đã phê duyệt" },
    { id: 4, value: "Từ chối" },
  ]);

  const getStatus = (power) => {
    switch (power) {
      case "1":
        return "Chờ phê duyệt";
        break;
      case "2":
        return "Đã xác nhận";
        break;
      case "3":
        return "Đã phê duyệt";
        break;
      case "4":
        return "Từ chối";
        break;
      default:
        break;
    }
  };

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
    formData.append("author", news.author);
    formData.append("content", news.content);
    formData.append("avatar", news.avatar);
    formData.append("department", news.department);
    formData.append("kindNews", news.kindNews);
    formData.append("summary", news.summary);
    formData.append("status", setStatus(role));
    formData.append("note", news.note);

    if (news.categories) {
      formData.append("categories", news.categories);
    }

    axios
      .post(`/api-news/update/${props.match.params.id}`, formData)
      .then((res) => {
        const redirect = props.match.url.split("/");
        history.push(`/${redirect[1] + "/" + redirect[2]}`);
      });
  };

  const onChangeTitle = (event) => {
    console.log(event.target.value);
    setNews({ ...news, title: event.target.value });
  };

  const onChangeAuthor = (event) => {
    console.log(event.target.value);
    setNews({ ...news, author: event.target.value });
  };

  const onChangeKind = (event) => {
    console.log(event.target.value);
    setNews({ ...news, kindNews: event.target.value });
  };

  const onChangeNote = (event) => {
    console.log(event.target.value);
    setNews({ ...news, note: event.target.value });
  };

  const onChangeStatus = (event) => {
    console.log(event.target.value);
    setNews({ ...news, status: event.target.value });
  };

  const onChangeContent = (event, editor) => {
    const data = editor.getData();
    setNews({ ...news, content: data });
    console.log({ data });
  };

  const onChangeAvarta = (e) => {
    e.preventDefault();
    setNews({ ...news, avatar: e.target.files[0] });
    //  console.log(res.data.fileNameInServer)
  };

  const onChangeSummary = (event) => {
    setNews({ ...news, summary: event.target.value });
  };

  const onChangeImages = (e) => {
    console.log(e.target.files);
    setNews({ ...news, images: e.target.files });
  };

  const updateRefuse = async () => {
    const id = localStorage.getItem("idUser");
    const res = await axios.post(
      `/api-news/update-refuse/${id}/${props.match.params.id}`
    );
    if (res.data.message == "Đã từ chối duyệt tin") {
      toast.success(res.data.message);
      const redirect = props.match.url.split("/");
      history.push(`/${redirect[1] + "/" + redirect[2]}`);
    } else {
      toast.error(res.data.message);
    }
  };

  const classes = useStyles();

  return (
    <div className="create-user-wrapper">
      <h3 style={{ marginBottom: 20 }}>Cập nhật tin</h3>
      <form className={classes.root} noValidate autoComplete="off">
        {/* <div className="item">
                    <label className="title-news">Title</label>
                    <Input
                        value={news.title}
                        onChange={onChangeAuthor}
                    ></Input>
                    <input type="text" placeholder="title" onChange={onChangeTitle} ></input>
                </div> */}

        <div className="item">
          <label className="title-news">Tiêu đề</label>
          <Input value={news.title} onChange={onChangeTitle}></Input>
          {/* <input type="text" placeholder="author" onChange={onChangeAuthor}></input> */}
        </div>

        <div className="item">
          <label className="title-news">Bút danh</label>
          <Input value={news.author} onChange={onChangeAuthor}></Input>
          {/* <input type="text" placeholder="author" onChange={onChangeAuthor}></input> */}
        </div>

        {role !== CTV_ROLE && (
          <div className="item">
            <label className="title-news">Loại tin</label>
            <Select
              value={news.kindNews}
              list={listKind}
              onChange={onChangeKind}
            ></Select>
          </div>
        )}

        {role !== THU_KY_ROLE && (
          <div className="item">
            <label className="title-news">Chủ đề tin</label>
            <Select
              value={news.categories}
              list={categoryList}
              onChange={(e) => setNews({ ...news, categories: e.target.value })}
            ></Select>
          </div>
        )}

        <div className="item">
          <label>Thumbnail</label>
          <div>
            <img width="100px" src={`/api-news/viewFile/${news.avatar}`}></img>
          </div>
          <Input onChange={onChangeAvarta} type="file"></Input>
          {/* <input type="file" name="avatar" placeholder="author" onChange={onChangeAvarta}></input> */}
        </div>

        <div className="item">
          <label>Tóm tắt</label>
          <Input value={news.summary} onChange={onChangeSummary}></Input>
          {/* <input type="text" placeholder="author" onChange={onChangeAuthor}></input> */}
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
              height: "300px",
              width: "1200px",
            }}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor1 is ready to use!" + news.content, editor);
            }}
          />
        </div>

        <div className="item">
          <label>Ảnh trong bài viết</label>
          <div
            style={{
              padding: "20px 0",
            }}
          >
            {news.images &&
              news.images.map((image) => (
                <img width="100px" style={{ marginRight: 12 }} src={image} />
              ))}
          </div>
          {/* <ButtonUpload onChange={onChangeImages}></ButtonUpload> */}
        </div>

        {role === TRUONG_BAN_BT_ROLE && (
          <div className="item">
            <label className="title-news">Ghi chú</label>
            <Input value={news.note} onChange={onChangeNote}></Input>
            {/* <input type="text" placeholder="author" onChange={onChangeAuthor}></input> */}
          </div>
        )}

        {role === ADMIN_ROLE && (
          <div className="item">
            <label className="title-news">Ghi chú</label>
            <Input value={news.note} onChange={onChangeNote}></Input>
            {/* <input type="text" placeholder="author" onChange={onChangeAuthor}></input> */}
          </div>
        )}

        {role === THU_KY_ROLE && (
          <div className="item">
            <label className="title-news">Ghi chú</label>
            <Input value={news.note} onChange={onChangeNote}></Input>
            {/* <input type="text" placeholder="author" onChange={onChangeAuthor}></input> */}
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
              title={role !== CTV_ROLE ? `Cập nhật và phê duyệt` : `Cập nhật`}
            ></Button>
          </span>

          {role !== CTV_ROLE && (
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
