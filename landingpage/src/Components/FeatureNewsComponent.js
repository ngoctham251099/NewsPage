import React from "react";

const FeatureNewsComponent = () => {
  return (
    <div className="row" data-aos="fade-up">
      <div className="col-xl-8 stretch-card grid-margin">
        <div className="position-relative">
          <img
            src="assets/images/dashboard/banner.jpg"
            alt="banner"
            className="img-fluid"
          />
          <div className="banner-content">
            <div className="badge badge-danger fs-12 font-weight-bold mb-3">
              global news
            </div>
            <h1 className="mb-0">GLOBAL PANDEMIC</h1>
            <h1 className="mb-2">
              Coronavirus Outbreak LIVE Updates: ICSE, CBSE Exams Postponed, 168
              Trains
            </h1>
            <div className="fs-12">
              <span className="mr-2">Photo </span>10 Minutes ago
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-4 stretch-card grid-margin">
        <div className="card bg-dark text-white">
          <div className="card-body">
            <h2>Latest news</h2>

            <div className="d-flex border-bottom-blue pt-3 pb-4 align-items-center justify-content-between">
              <div className="pr-3">
                <h5>Virus Kills Member Of Advising Iran’s Supreme</h5>
                <div className="fs-12">
                  <span className="mr-2">Photo </span>10 Minutes ago
                </div>
              </div>
              <div className="rotate-img">
                <img
                  src="assets/images/dashboard/home_1.jpg"
                  alt="thumb"
                  className="img-fluid img-lg"
                />
              </div>
            </div>

            <div className="d-flex border-bottom-blue pb-4 pt-4 align-items-center justify-content-between">
              <div className="pr-3">
                <h5>Virus Kills Member Of Advising Iran’s Supreme</h5>
                <div className="fs-12">
                  <span className="mr-2">Photo </span>10 Minutes ago
                </div>
              </div>
              <div className="rotate-img">
                <img
                  src="assets/images/dashboard/home_2.jpg"
                  alt="thumb"
                  className="img-fluid img-lg"
                />
              </div>
            </div>

            <div className="d-flex pt-4 align-items-center justify-content-between">
              <div className="pr-3">
                <h5>Virus Kills Member Of Advising Iran’s Supreme</h5>
                <div className="fs-12">
                  <span className="mr-2">Photo </span>10 Minutes ago
                </div>
              </div>
              <div className="rotate-img">
                <img
                  src="assets/images/dashboard/home_3.jpg"
                  alt="thumb"
                  className="img-fluid img-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureNewsComponent;
