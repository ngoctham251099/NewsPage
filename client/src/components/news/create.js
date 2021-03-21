import React, { useState } from 'react';
import axios from 'axios';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
function CreateNews() {

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
        formData.append("title", title)
        formData.append("author", author)
        formData.append("content", content)
        formData.append("avatar", avatar)
        formData.append('idUser', idUser)
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
                //console.log(res.data.file)
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


    return (
        <div>
            <h1 className="title">Create News</h1>
            <form>
                <div className="item">
                    <label className="title-news">Title</label>
                    <input type="text" placeholder="title" onChange={onChangeTitle} ></input>
                </div>

                <div className="item">
                    <label>Author</label>
                    <input type="text" placeholder="author" onChange={onChangeAuthor}></input>
                </div>

                <div className="item">
                    <label>Avatar</label>
                    <input type="file" name="avatar" placeholder="author" onChange={onChangeAvarta}></input>
                </div>

                <div className="item">
                    <label>Dare submitted</label>
                    <input type="date" placeholder="date submitted" onChange={onChangeDate} ></input>
                </div>
                <div>
                <CKEditor
                        editor={ClassicEditor}
                        onChange={onChangeContent}
                        config = {
                            {
                            ckfinder: {
                                // The URL that the images are uploaded to.
                                uploadUrl: '/api-news/upload'
                            } }
                        }
                        
                    />

                </div>
                    
                <div className="item">
                    <label>Imaegs</label>
                    <input type="file" name="images" placeholder="images" onChange={onChangeImages} multiple></input>
                </div>
            </form>

            <button onClick={addNews}>Submit</button>
            
        </div>
    )
}

export default CreateNews;