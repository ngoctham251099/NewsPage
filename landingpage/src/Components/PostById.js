import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import axios from "axios";

const PostById = (props) => {
  const [news, setNews] = useState();
  const allPost = props.allPost;
  useEffect(async () => {
    const res = await axios.post(`/api-news/views-news/${props.match.params.id}`);
    console.log(res.data.arrNews)
    setNews(res.data.arrNews)
  },[])
  return (
    <div>
      <div class="content-wrapper">
        <div class="container">
          <div class="col-sm-12">
            <div class="card" data-aos="fade-up">
              <div class="card-body">
                <div class="row">
                  <div class="col-lg-8">
                    {news &&
                      (<div>
                        <h1 class="font-weight-600 mb-1">
                          {news.title}
                        </h1>
                        <p class="fs-13 text-muted mb-0">
                          <span class="mr-2">Photo </span>10 Minutes ago
                        </p>
                        <div class="rotate-img">
                          {/* <img
                            src="../assets/images/inner/inner_1.jpg"
                            alt="banner"
                            class="img-fluid mt-4 mb-4"
                          /> */}
                          {news.summary}
                        </div>
                        <p class="mb-4 fs-15">
                        {parse(news.content)}
                        </p>
                      </div>
                    )}
                    
                    {/* <div class="post-comment-section">
                      <h3 class="font-weight-600">Related Posts</h3>
                      <div class="row">
                        <div class="col-sm-6">
                          <div class="post-author">
                            <div class="rotate-img">
                              <img
                                src="../assets/images/inner/inner_5.jpg"
                                alt="banner"
                                class="img-fluid"
                              />
                            </div>
                            <div class="post-author-content">
                              <h5 class="mb-1">
                                Virus Kills Member Of Council Advising Iran’s
                                Supreme Leader
                              </h5>
                              <p class="fs-13 text-muted mb-0">
                                <span class="mr-2">Photo </span>10 Minutes ago
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="post-author">
                            <div class="rotate-img">
                              <img
                                src="../assets/images/inner/inner_6.jpg"
                                alt="banner"
                                class="img-fluid"
                              />
                            </div>
                            <div class="post-author-content">
                              <h5 class="mb-1">
                                Virus Kills Member Of Council Advising Iran’s
                                Supreme Leader
                              </h5>
                              <p class="fs-13 text-muted mb-0">
                                <span class="mr-2">Photo </span>10 Minutes ago
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                  <div class="col-lg-4">
                    <h2 class="mb-4 text-primary font-weight-600">
                      Latest news
                    </h2>
                    {allPost && allPost.slice(0,3).map(item => (
                       <div class="row">
                       <div class="col-sm-12">
                         <div class="pt-4">
                           <div class="row">
                             <div class="col-sm-8">
                               <h5 class="font-weight-600 mb-1">
                                 {item._doc.title}
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
                    ))}
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

export default PostById
