import React, { useEffect, useState } from "react";
import CategoryComponent from "./CategoryComponent";
import FeatureNewsComponent from "./FeatureNewsComponent";
import axios from "axios";

const MainContentContainer = ({ categories }) => {
  const [allPost, setAllPost] = useState([]);

  useEffect(() => {
    axios.get("/api-news/list-news-post").then((res) => {
      setAllPost(res.data.news);
    });
  }, []);

  return (
    <div className="content-wrapper">
      <div className="container">
        <FeatureNewsComponent newsData={allPost} />
        <div className="row" data-aos="fade-up">
          <CategoryComponent categories={categories} />

          <div className="col-lg-9 stretch-card grid-margin">
            <div className="card">
              <div className="card-body">
                {allPost &&
                  allPost.slice(5, allPost.length).map((item, index) => (
                    <div className="row">
                      <div className="col-sm-4 grid-margin">
                        <div className="position-relative">
                          <div className="rotate-img">
                            <img
                              src={item._doc.thumbnail}
                              alt="thumb"
                              className="img-fluid"
                            />
                          </div>
                          {/* <div className="badge-positioned">
                      <span className="badge badge-danger font-weight-bold">
                        Flash news
                      </span>
                    </div> */}
                        </div>
                      </div>
                      <div className="col-sm-8  grid-margin">
                        <h2 className="mb-2 font-weight-600">
                          {item._doc.title}
                        </h2>
                        <div className="fs-13 mb-2">
                          <span className="mr-2">{item.nameKind} </span>10
                          Minutes ago
                        </div>
                        <p className="mb-0">{item._doc.summary}</p>
                      </div>
                    </div>
                  ))}{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContentContainer;
