import React, { useEffect, useState } from "react";
import axios from "axios";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

import Input from "../UI/Input";
import ButtonAdd from "../UI/button-add";
import { useHistory } from "react-router-dom";
import Select2 from "../UI/select2";
import Switch from "react-switch";
import { toast } from "react-toastify";

import {
  CTV_ROLE,
  ADMIN_ROLE,
  TRUONG_BAN_BT_ROLE,
  BAN_BT_ROLE,
  THU_KY_ROLE,
} from "../../config/roles";

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

function CreateNews(props) {
  const { role } = props;
  let history = useHistory();
  const classes = useStyles();

  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [avatar, setAvatar] = useState();
  const [summary, setSummary] = useState();
  const [note, setNote] = useState();
  const [kind, setKind] = useState();
  const [category, setCategory] = useState();
  const [kindImages, setKindImages] = useState();

  const [categoryList, setCategoryList] = useState([]);
  const [listKind, setListKind] = useState([]);
  const [priceOfKind, setPriceOfKind] = useState([]);
  const [idPriceOfKind, setIdPriceOfKind] = useState();
  const [kindOfImages, setKindOfImages] = useState([]);
  const [isPostedFanpage, setIsPostedFanpage] = useState(false);

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

  useEffect(() => {
    axios.get("/api-price-of-kind").then((res) =>{
      console.log(res.data.priceOfNews)
      setPriceOfKind(res.data.priceOfNews)
    });
  }, []);

  useEffect(() => {
    axios.get("/api-price-of-images").then((res) =>{
      console.log(res.data.kind)
      setKindOfImages(res.data.kind)
    });
  }, []);

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChangeSummary = (event) => {
    setSummary(event.target.value);
  };

  const onChangeContent = (event, editor) => {
    const data = editor.getData();
    console.log(data)
    setContent(data);
  };

  const onChangePrice = (event) => {
    setIdPriceOfKind(event.target.value);
  };

  const onChangeKindImages = (event) => {
    setKindImages(event.target.value);
  };

  const onChangeKind = (event) => {
    setKind(event.target.value);
  };

  const onChangeAvarta = (e) => {
    e.preventDefault();
    setAvatar(e.target.files[0]);
  };

  const classes1 = useStyles1();

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
    formData.append("content", content);
    formData.append("avatar", avatar);
    formData.append("idUser", idUser);
    formData.append("summary", summary);
    formData.append("kindNews", kind);
    formData.append("categories", category);
    formData.append("note", note);
    formData.append("status", setStatus(role));
    formData.append("idPriceOfKind", idPriceOfKind);
    formData.append("idKindImages", kindImages);
    formData.append("isPostedFanpage", isPostedFanpage);
    
    axios.post("/api-news/create", formData).then((res) => {
      if(res.data.message == "Thêm thành công"){
        toast.success(res.data.message);
        // history.push(`${props.path}/news`);
        history.goBack();
      }else{
        toast.error(res.data.message)
      }
      
    });
  };

  return (
    
    <div className="create-user-wrapper">
      <h3 style={{ marginBottom: 20 }}>Thêm bài viết</h3>
      <form className={classes1.root} noValidate autoComplete="off">
        <div className="item">
          <label className="title-news">Tiêu đề</label>
          <Input onChange={onChangeTitle}></Input>
          {/* <input type="text" placeholder="title" onChange={onChangeTitle} ></input> */}
        </div>

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

        {role !== CTV_ROLE && (
          <div className="item">
            <label className="title-news">Thể loại</label>
            <Select2
              value={kind}
              list={listKind}
              onChange={onChangeKind}
            ></Select2  >
          </div>
        )}
        {kind !== undefined ? (
          role !== CTV_ROLE && (
            <div>
              <label>Chất lượng loại tin</label>
              <FormControl className={classes.margin}>
                <Select
                  id="demo-customized-select"
                  value={idPriceOfKind}
                  onChange={onChangePrice}
                  input={<BootstrapInput />}
                >
                {priceOfKind.filter(item => {
                if(kind == -1){ 
                  return '';
                }
                  return String(item.idKind) === kind;
                }).map(item => {
                  return (<MenuItem value={item._id}>{item.name}</MenuItem>)
                })}
                </Select>
              </FormControl>
            </div>
          )
        ): null}

        {role !== CTV_ROLE && (
          <div className="item">
            <label className="title-news">Loại ảnh<p style={{color: "#ff0000"}}> (nếu loại tin là Bài viết tin/ Ảnh)</p></label>
            <Select2
              value={kindImages}
              list={kindOfImages}
              onChange={onChangeKindImages}
            ></Select2>
          </div>
        )}

          <div className="item">
            <label className="title-news">Chuyên mục đăng</label>
            <Select2
              value={category}
              list={categoryList}
              onChange={(e) => {
                setCategory(e.target.value)
              }}
            ></Select2>
          </div>

        {role !== CTV_ROLE && (
          <div className="item">
            <label className="title-news">Ghi chú</label>
            <Input onChange={(event) => setNote(event.target.value)}></Input>
          </div>
        )}

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
              disabled={role !== TRUONG_BAN_BT_ROLE && role !== ADMIN_ROLE}
              className="statusToggle"
              onChange={(checked) =>
                setIsPostedFanpage(checked)
              }
              checked={isPostedFanpage}
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
      </form>

      

      <ButtonAdd onClick={addNews} title="Lưu"></ButtonAdd>
    </div>
  );
}

export default CreateNews;
