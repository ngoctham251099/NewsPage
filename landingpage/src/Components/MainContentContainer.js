import React, { useEffect } from "react";
import CategoryComponent from './CategoryComponent';
import FeatureNewsComponent from './FeatureNewsComponent';

const MainContentContainer = () => {
  
  useEffect(() => {
    console.log('Fetch all news here');
    
  }, [])

  return (
    <div className="content-wrapper">
      <div className="container">
        <FeatureNewsComponent />
        <div className="row" data-aos="fade-up">
          <CategoryComponent />
          <div className="col-lg-9 stretch-card grid-margin">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-4 grid-margin">
                    <div className="position-relative">
                      <div className="rotate-img">
                        <img
                          src="assets/images/dashboard/home_4.jpg"
                          alt="thumb"
                          className="img-fluid"
                        />
                      </div>
                      <div className="badge-positioned">
                        <span className="badge badge-danger font-weight-bold">
                          Flash news
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-8  grid-margin">
                    <h2 className="mb-2 font-weight-600">
                      South Korea’s Moon Jae-in sworn in vowing to address North
                    </h2>
                    <div className="fs-13 mb-2">
                      <span className="mr-2">Photo </span>10 Minutes ago
                    </div>
                    <p className="mb-0">
                      Lorem Ipsum has been the industry's standard dummy text
                      ever since the 1500s, when an
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-4 grid-margin">
                    <div className="position-relative">
                      <div className="rotate-img">
                        <img
                          src="assets/images/dashboard/home_5.jpg"
                          alt="thumb"
                          className="img-fluid"
                        />
                      </div>
                      <div className="badge-positioned">
                        <span className="badge badge-danger font-weight-bold">
                          Flash news
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-8  grid-margin">
                    <h2 className="mb-2 font-weight-600">
                      No charges over 2017 Conservative battle bus cases
                    </h2>
                    <div className="fs-13 mb-2">
                      <span className="mr-2">Photo </span>10 Minutes ago
                    </div>
                    <p className="mb-0">
                      Lorem Ipsum has been the industry's standard dummy text
                      ever since the 1500s, when an
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-4">
                    <div className="position-relative">
                      <div className="rotate-img">
                        <img
                          src="assets/images/dashboard/home_6.jpg"
                          alt="thumb"
                          className="img-fluid"
                        />
                      </div>
                      <div className="badge-positioned">
                        <span className="badge badge-danger font-weight-bold">
                          Flash news
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-8">
                    <h2 className="mb-2 font-weight-600">
                      Kaine: Trump Jr. may have committed treason
                    </h2>
                    <div className="fs-13 mb-2">
                      <span className="mr-2">Photo </span>10 Minutes ago
                    </div>
                    <p className="mb-0">
                      Lorem Ipsum has been the industry's standard dummy text
                      ever since the 1500s, when an
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContentContainer;
