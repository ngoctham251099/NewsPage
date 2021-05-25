import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";

const PostByCategoryComponent = (props) => {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState();
  const allPost = props.allPost;

  useEffect( async ()=> {
    const res = await axios.post(`/api-news/list-news-by-caterogy/${props.match.params.id}`)
    setNews(res.data.news);
    setCategory(res.data.category)
  },[])
  return (
   <div>
     <div class="flash-news-banner">
      </div>
        <div class="content-wrapper">
          <div class="container">
            <div class="col-sm-12">
              <div class="card" data-aos="fade-up">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-12">
                      <h1 class="font-weight-600 mb-4">
                        {category}
                      </h1>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-8">
                      {news ? news.map( item => (
                        <div class="row">
                          <div class="col-sm-4 grid-margin">
                            <div class="rotate-img">
                              <img
                                src={item._doc.thumbnail}
                                alt="banner"
                                class="img-fluid"
                              />
                            </div>
                          </div>
                          <div class="col-sm-8 grid-margin">
                            <Link to={`/post/${item._doc._id}`} style={{
                              color: "#000"
                            }}>{item._doc.title}</Link>
                            <p class="fs-13 text-muted mb-0">
                              <span class="mr-2">Photo </span>10 Minutes ago
                            </p>
                            <p class="fs-15">
                              {item._doc.summary}
                            </p>
                          </div>
                        </div>
                      )): null}
                    
                     
                    </div>
                    <div class="col-lg-4">
                      <h2 class="mb-4 text-primary font-weight-600">
                        Latest news
                      </h2>
                    
                      {allPost ? allPost.slice(0,3).map(item => (
                        <div class="row">
                        <div class="col-sm-12">
                          <div class="border-bottom pb-4 pt-4">
                            <div class="row">
                              <div class="col-sm-8">
                                <h5 class="font-weight-600 mb-1">
                                  <Link path={`/post/${item._doc._id}`} style={{
                                    color: "#000"
                                  }}>{item._doc.title}</Link>
                                </h5>
                                <p class="fs-13 text-muted mb-0">
                                  <span class="mr-2">Photo </span>10 Minutes ago
                                </p>
                              </div>
                              <div class="col-sm-4">
                                <div class="rotate-img">
                                  <img
                                    src={item._doc.thumbnail}
                                    alt="banner"
                                    class="img-fluid"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      )):null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

   </div>
  )
}

export default PostByCategoryComponent


