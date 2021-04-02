import React, { useState } from 'react';
import axios from 'axios';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { makeStyles } from '@material-ui/core/styles';
import Input from '../UI/Input'
import Button from '../UI/button-add'
import Select from '../UI/select';
import { useEffect } from 'react/cjs/react.development';
import ButtonUpload from '../UI/Button';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '100ch',
      },
    },
  }));

export default function EditNews(props) {
    let history = useHistory();
    const [news, setNews] = useState({
      "title": "",
      "content": "",
      "author": "",
      "status": "",
      "avatar": "",
      "kindNews": "",
      "images": "", 
      "note": ""
    });

    const [listKind, setListKind] = useState([]);
    const[content, setContent] = useState('');
    const [arrImages, setArrImages] = useState([]);

    useEffect(async () => {
      const res  = await axios.post(`/api-news/edit/${props.match.params.id}`,
        {id: props.match.params.id}
      )

      if(res.data.news){
        setNews(res.data.news)
        setContent(res.data.news.content)
        setArrImages(res.data.news.images)
      }else{
        console.log("jhedjshzb")
      }

    },[])

    useEffect(() => {
      axios.get('/api-kind')
      .then(
        res => {
          console.log(res.data.kind)
          setListKind(res.data.kind)
        }
      )
    },[])

    const [power, setPower] = useState([
      {id: 1 , value: "Chờ phê duyệt"},
      {id: 2 , value: "Đã xác nhận"},
      {id: 3 , value: "Đã phê duyệt"},
      {id: 4 , value: "Từ chối"}])
    
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
    }

    const submit = () =>{
      const formData =  new FormData();
        // const date_submitted = moment().subtract(10, 'days').calendar();
        formData.append("title", news.title)
        formData.append("author", news.author)
        formData.append("content", news.content)
        formData.append("avatar", news.avatar)
        formData.append('department', news.department)
        formData.append('kindNews', news.kindNews)
        formData.append('status', news.status)
        formData.append('note', news.note)

        for(const key of Object.keys(news.images)){
          formData.append('images', news.images[key])
        }

        axios.post(`/api-news/update/${props.match.params.id}`,formData)
        .then(
            res => {
              history.push(`${props.path}/news`)
            }
        )
    }

    const onChangeTitle = (event) => {
      console.log(event.target.value)
      setNews({...news, tilte: event.target.value});
  }

    const onChangeAuthor= (event) => {
        console.log(event.target.value)
        setNews({...news, author: event.target.value});
    }

    const onChangeKind= (event) => {
      console.log(event.target.value)
      setNews({...news, kindNews: event.target.value});
    }

    const onChangeNote= (event) => {
      console.log(event.target.value)
      setNews({...news, note: event.target.value});
    }

    const onChangeStatus= (event) => {
      console.log(event.target.value)
      setNews({...news, status: event.target.value});
    }

    const onChangeContent = (event, editor) =>{
        const data = editor.getData();
        setNews({...news, content: data});
        console.log({data})
    }

    const onChangeAvarta = (e) =>{
        e.preventDefault();
        console.log(e.target.files[0])
        setNews({...news, avatar: e.target.files[0]})
      //  console.log(res.data.fileNameInServer)
    }

    const onChangeImages = (e) => {
        console.log(e.target.files)
        setNews({...news, images: e.target.files})
    }

    const classes = useStyles();

    return (
        <div>
            <h1 className="title">Cập nhật tin</h1>
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
                    <Input
                        value={news.title}
                        onChange={onChangeTitle}
                    ></Input>
                    {/* <input type="text" placeholder="author" onChange={onChangeAuthor}></input> */}
                </div>

                <div className="item">
                    <label className="title-news">Tác giả</label>
                    <Input
                        value={news.author}
                        onChange={onChangeAuthor}
                    ></Input>
                    {/* <input type="text" placeholder="author" onChange={onChangeAuthor}></input> */}
                </div>

                <div>
                    <label>Trạng thái</label>
                    <Select value={news.status} listPower={power} onChange={onChangeStatus}></Select>
                    {/* <input type="text" placeholder="author" onChange={onChangeAuthor}></input> */}
                </div>

                <div className="item">
                    <label className="title-news">Loại tin</label>
                    <Select value={news.kind} list={listKind} onChange={onChangeKind}></Select>
                    {/* <input type="text" placeholder="author" onChange={onChangeAuthor}></input> */}
                </div>

                <div className="item">

                    <label>Avatar</label>
                    <div>
                    <img width="100px" src={`/api-news/viewFile/${news.avatar}`}></img>
                  </div>
                    <Input
                        onChange={onChangeAvarta}
                        type = 'file'
                    ></Input>
                    {/* <input type="file" name="avatar" placeholder="author" onChange={onChangeAvarta}></input> */}
                </div>

                <div>

                <CKEditor
                        data= {content.toString()}
                        editor={ClassicEditor}
                        onChange={onChangeContent}
                        config = {
                            {
                            ckfinder: {
                                // The URL that the images are uploaded to.
                                uploadUrl: '/api-news/upload',
                            },
														height: '300px',
														width: '1200px'
													}
                        }
                        onReady={ editor => {
                          // You can store the "editor" and use when it is needed.
                          console.log( 'Editor1 is ready to use!'+ news.content, editor );
                      } }
                        
                    />

                </div>

                <div className="item">
                  <label>Ảnh trong bài viết</label>
                  <div>
                      {<img width="100px" src={`/api-news/viewFile/${news.images}`}></img>}
                  </div>
                  <ButtonUpload
                        onChange={onChangeImages}
                    ></ButtonUpload>
                </div>

                <div className="item">
                    <label className="title-news">Ghi chú</label>
                    <Input
                        value={news.note}
                        onChange={onChangeNote}
                    ></Input>
                    {/* <input type="text" placeholder="author" onChange={onChangeAuthor}></input> */}
                </div>
                    
                <div className="item">
                    <Button
                      onClick = {submit}
                      title="Cập nhật"
										></Button>
                    {/* <input type="file" name="images" placeholder="images" onChange={onChangeImages} multiple></input> */}
                </div>
            </form>            
        </div>
    )
}
