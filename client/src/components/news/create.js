import React, { useState } from 'react';
import axios from 'axios';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
function CreateNews() {

    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const [content, setContent] = useState();
    const [date, setDate] = useState();


    const addNews = () => {
        axios.post('/api-news/create',{
            title: title,
            author: author,
            content: content,
            date_submitted: date
        })
        .then(
            res => {
                console.log(res.data);
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


    return (
        <div>
            <h1 className="title">Create News</h1>
            <div className="item">
                <label className="title-news">Title</label>
                <input type="text" placeholder="title" onChange={onChangeTitle} ></input>
            </div>

            <div className="item">
                <label>Author</label>
                <input type="text" placeholder="author" onChange={onChangeAuthor}></input>
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
                            uploadUrl: '/api-news/upload', 
                
                              // Enable the XMLHttpRequest.withCredentials property.
                            //   withCredentials: false,
                
                            //   // Headers sent along with the XMLHttpRequest to the upload server.
                            //   headers: {
                            //       'X-CSRF-TOKEN': 'CSFR-Token',
                            //        Authorization: 'Bearer <JSON Web Token>'
                            //   }
                        } }
                    }
                    
                />

            </div>
                
                <button onClick={addNews}>Submit</button>
        </div>
    )
}

export default CreateNews;