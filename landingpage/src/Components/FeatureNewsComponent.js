import React from "react";

const FeatureNewsComponent = ({ newsData }) => {
  console.log(newsData[0]?._doc.thumbnail);
  return (
    <div className="row" data-aos="fade-up">
      <div className="col-xl-8 stretch-card grid-margin">
        <div className="position-relative">
          <img
            src={newsData[0]?._doc.thumbnail}
            alt="banner"
            className="img-fluid-first-news"
          />
          <div className="banner-content">
            <h1 className="mb-0 text-uppercase">{newsData[0]?._doc.title}</h1>

            <div className="fs-12">
              <span className="mr-2">{newsData[0]?.nameKind} </span>10 Minutes
              ago
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-4 stretch-card grid-margin">
        <div className="card bg-dark text-white">
          <div className="card-body">
            <h2>Tin gần đây</h2>

            {newsData.slice(1, 4).map((item, index) => (
              <div className="d-flex border-bottom-blue pb-4 pt-4 align-items-center justify-content-between" key={index}>
                <div className="pr-3">
                  <h5>{item._doc.title}</h5>
                  <div className="fs-12">
                    <span className="mr-2">{item.nameKind} </span>10 Minutes ago
                  </div>
                </div>
                <div className="rotate-img">
                  <img
                    src={item._doc.thumbnail}
                    alt="thumb"
                    className="img-fluid img-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureNewsComponent;