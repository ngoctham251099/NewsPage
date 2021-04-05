import React, { useEffect, useState } from "react";
import axios from "axios";
import parse from "html-react-parser";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { makeStyles } from "@material-ui/core/styles";
import Input from "../UI/Input";
import Button from "../UI/Button";
import ButtonAdd from "../UI/button-add";
import { useHistory } from "react-router-dom";
import Select from "../UI/select";
import {
  CTV_ROLE,
  ADMIN_ROLE,
  TRUONG_BAN_BT_ROLE,
  BAN_BT_ROLE,
  THU_KY_ROLE,
} from "../../config/roles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100ch",
    },
  },
}));

function CreateNews(props) {
  const { role } = props;
  let history = useHistory();

  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [content, setContent] = useState();
  const [date, setDate] = useState();
  const [avatar, setAvatar] = useState();
  const [message, setMessage] = useState();
  const [images, setImages] = useState();
  const [summary, setSummary] = useState();
  const [note, setNote] = useState();

  const [kind, setKind] = useState();
  const [category, setCategory] = useState();

  const [categoryList, setCategoryList] = useState([]);
  const [listKind, setListKind] = useState([]);

  console.log(categoryList)
  console.log(listKind)
  const idUser = localStorage.getItem("idUser");

  useEffect(() => {
    axios.get("/api-categories").then((res) => {
      setCategoryList(res.data.categories);
    });
  }, []);

  useEffect(() => {
    axios.get("/api-kind").then((res) => {
      setListKind(res.data.kind);
    });
  }, []);

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChangeAuthor = (event) => {
    setAuthor(event.target.value);
  };

  const onChangeSummary = (event) => {
    setSummary(event.target.value);
  };

  const onChangeContent = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const onChangeAvarta = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    setAvatar(e.target.files[0]);
    //  console.log(res.data.fileNameInServer)
  };

  const onChangeImages = (e) => {
    setImages(e.target.files);
  };

  const classes = useStyles();

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

  const addNews = () => {
    console.log(kind, category)
    const formData = new FormData();
    // const date_submitted = moment().subtract(10, 'days').calendar();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("content", content);
    formData.append("avatar", avatar);
    formData.append("idUser", idUser);
    formData.append("summary", summary);
    formData.append("kindNews", kind);
    formData.append("categories", category);
    formData.append("note", note);
    formData.append("status", setStatus(role));
    axios.post("/api-news/create", formData).then((res) => {
      history.push(`${props.path}/news`);
    });
  };

  return (
    <div className="create-user-wrapper">
      <h3 style={{ marginBottom: 20 }}>Thêm bài viết</h3>
      <form className={classes.root} noValidate autoComplete="off">
        <div className="item">
          <label className="title-news">Title</label>
          <Input onChange={onChangeTitle}></Input>
          {/* <input type="text" placeholder="title" onChange={onChangeTitle} ></input> */}
        </div>

        <div className="item">
          <label>Tác giả</label>
          <Input onChange={onChangeAuthor}></Input>
          {/* <input type="text" placeholder="author" onChange={onChangeAuthor}></input> */}
        </div>

        {role !== CTV_ROLE && (
          <div className="item">
            <label className="title-news">Loại tin</label>
            <Select
              value={kind}
              list={listKind}
              onChange={(e) => setKind(e.target.value)}
            ></Select>
          </div>
        )}

        {role !== CTV_ROLE && (
          <div className="item">
            <label className="title-news">Chủ đề tin</label>
            <Select
              value={category}
              list={categoryList}
              onChange={(e) => {
                console.log(e)
                setCategory(e.target.value)
              }}
            ></Select>
          </div>
        )}

        <div className="item">
          <label>Tóm tắt</label>
          <Input onChange={onChangeSummary}></Input>
          {/* <input type="text" placeholder="author" onChange={onChangeAuthor}></input> */}
        </div>

        <div className="item">
          <label>Thumbnail</label>
          <Input onChange={onChangeAvarta} type="file"></Input>
          {/* <input type="file" name="avatar" placeholder="author" onChange={onChangeAvarta}></input> */}
        </div>

        <div className="item" style={{ marginTop: 16 }}>
          <CKEditor
            editor={ClassicEditor}
            onChange={onChangeContent}
            config={{
              ckfinder: {
                // The URL that the images are uploaded to.
                uploadUrl: "/api-news/upload",
              },
            }}
          />
        </div>
      </form>

      {role === ADMIN_ROLE && (
          <div className="item">
            <label className="title-news">Ghi chú</label>
            <Input value={note} onChange={(event) => setNote(event.target.value)}></Input>
          </div>
        )}

      <ButtonAdd onClick={addNews} title="Lưu"></ButtonAdd>
    </div>
  );
}

export default CreateNews;
