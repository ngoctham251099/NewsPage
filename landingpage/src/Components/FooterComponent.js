import React from 'react';

const FooterComponent = () => {
  return (
    <footer>
    <div className="footer-top">
      <div className="container">
        <div className="row">
          <div className="col-sm-5">
            <h3>SỞ THÔNG TIN VÀ TRUYỀN THÔNG AN GIANG</h3>
            <p>Giấy phép thiết lập website số 51/GP-TTDT do Cục Quản lý Phát Thanh, Truyền hình và thông tin điện tử cấp ngày 11/8/2008</p>
            <p>Người chịu trách nhiệm chính: Ông Lê Việt Phương - Phó Giám đốc Sở Thông tin và Truyền thông An Giang</p>
            <ul className="social-media mb-3">
              <li>
                <a href="#">
                  <i className="mdi mdi-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="mdi mdi-youtube"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="mdi mdi-twitter"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-sm-4">
            <h3 className="font-weight-bold mb-3">LIÊN HỆ</h3>
            <div className="row">
              <div className="col-sm-12">
                <div className="footer-border-bottom pb-2">
                  <div className="row">
                    <div className="col-9">
                      <h5 className="font-weight-600">
                        Địa chỉ: 01 Lê Hồng Phong, P. Mỹ Bình, TP Long Xuyện, tỉnh An Giang
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="footer-border-bottom pb-2 pt-2">
                  <div className="row">
                    <div className="col-9">
                      <h5 className="font-weight-600">
                        Số điện thoại: (02963) 956898
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div>
                  <div className="row">
                    <div className="col-9">
                      <h5 className="font-weight-600 mb-3">
                        Email: sotttt@angiang.gov.vn
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <h3 className="font-weight-bold mb-3">Tìm kiếm</h3>
            <div className="footer-border-bottom pb-2">
              <div className="d-flex justify-content-between align-items-center">
                <input placeholder="Tìm kiếm"></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="d-sm-flex justify-content-between align-items-center">
              <div className="fs-14 font-weight-600">
                Copyright © 2020 @{" "} sotttt.angiang.gov.vn. All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>

  )
}

export default FooterComponent
