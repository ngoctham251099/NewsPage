import React, { useState } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { makeStyles } from '@material-ui/core/styles';
import Input from '../UI/Input'
import Button from '../UI/Button'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '100ch',
      },
    },
  }));

function CreateNews(props) {
    let history = useHistory();

    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const [content, setContent] = useState();
    const [date, setDate] = useState();
    const [avatar, setAvatar] = useState();
    const [message, setMessage] = useState();
    const [images , setImages] = useState();
    const idUser = localStorage.getItem('idUser');
    

    const addNews = () => {
        const formData =  new FormData();
        // const date_submitted = moment().subtract(10, 'days').calendar();
        formData.append("title", title)
        formData.append("author", author)
        formData.append("content", content)
        formData.append("avatar", avatar)
        formData.append('idUser', idUser)
        //formData.append("date_submitted",date_submitted)
        for(const key of Object.keys(images)){
            formData.append('images', images[key])
        }
        // if(!avatar){
        //     setMessage("Bạn chưa chọn file")
        // }

        // const config = {
        //     headers: {"content-type": "multipart/form-data"}
        // }
        axios.post('/api-news/create',formData)
        .then(
            res => {
                console.log(res.data);
                history.push(`${props.path}/news`)
            }
        )
    }

    const onChangeTitle = (event) => {
        console.log(event.target.value)
        setTitle(event.target.value);
    }

    const onChangeAuthor= (event) => {
        console.log(event.target.value)
        setAuthor(event.target.value);
    }

    const onChangeDate = (event) => {
        console.log(event.target.value)
        setDate(event.target.value);
    }

    const onChangeContent = (event, editor) =>{
        const data = editor.getData();
        setContent(data);
        console.log({data})
    }

    const onChangeAvarta = (e) =>{
        e.preventDefault();
        console.log(e.target.files[0])
        setAvatar(e.target.files[0])
      //  console.log(res.data.fileNameInServer)
    }

    const onChangeImages = (e) => {
        console.log(e.target.files)
        setImages(e.target.files)
    }

    const classes = useStyles();

    return (
        <div>
            <h1 className="title">Create News</h1>
            <form className={classes.root} noValidate autoComplete="off">
                <div className="item">
                    <label className="title-news">Title</label>
                    <Input
                        title="Tiêu đề"
                        onChange={onChangeTitle}
                    ></Input>
                    {/* <input type="text" placeholder="title" onChange={onChangeTitle} ></input> */}
                </div>

                <div className="item">
                    <label>Tác giả</label>
                    <Input
                        title="Tác giả"
                        onChange={onChangeAuthor}
                    ></Input>
                    {/* <input type="text" placeholder="author" onChange={onChangeAuthor}></input> */}
                </div>

                <div className="item">
                    <label>Avatar</label>
                    <Input
                        onChange={onChangeAvarta}
                        type = 'file'
                    ></Input>
                    {/* <input type="file" name="avatar" placeholder="author" onChange={onChangeAvarta}></input> */}
                </div>
                <div>
                <CKEditor
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
                        
                    />

                </div>
                    
                <div className="item">
                    <label>Imaegs</label>
                    <Button
                        onChange={onChangeImages}
                        title="Ảnh trong bản tin trên"
                    ></Button>
                    {/* <input type="file" name="images" placeholder="images" onChange={onChangeImages} multiple></input> */}
                </div>
            </form>

            <button onClick={addNews}>Submit</button>
            
        </div>
    )
}

export default CreateNews;