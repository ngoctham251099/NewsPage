const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './upload/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage : storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
})

const cpUpload = upload.fields([{name: 'avatar', maxCount: 1}, {name: 'images', maxCount: 8}])

const  newsController = require('../controllers/news-controller');

// router.post('/upload', newsController.uploadImages )
router.get('/', newsController.showNews);
router.post('/create', cpUpload,newsController.create);
router.delete('/remove/:id', newsController.delete);
router.post('update/:id', newsController.update);
router.post('/view/:id', newsController.viewsId);
router.get('/viewFile/:name', newsController.viewsImages)
router.get('/viewsPower', newsController.statistical)
router.post('/update-status/:id', newsController.updateStatusManager)
//update sts
//View list news theo department cho truong phong
router.get('/views-manager', newsController.viewsDepartment)
//view list news theo department cho giam doc
router.get('/views-president', newsController.viewsDepartmentPresident)
//Thống kê theo ngày
router.post('/statisticalFromDate',newsController.statisticalFromDate)
//Thống kê theo tháng
router.post('/statisticalFromMonth', newsController.statisticalFromMonth )
//Thống kee từ ngày này đến ngày kia
router.post('/statisticalFromDateToDate', newsController.statisticalFromDateToDate )
//Thống kê từ tháng này đến tháng kia
router.post('/statisticalFromMonthtoMonth', newsController.statisticalFromMonthtoMonth)
//Thống kê theo năm
router.post('/statisticalFromYear', newsController.statisticalFromYear)
//Thống kê theo tên tác giả
router.post('/statisticalAuthor', newsController.statisticalAuthor)

//----------------------------------
//Danh sách tin đã được duyệt
router.get('/list-news-approved', newsController.listNewsApproved)

//----------------------------------
//Danh sách tin chờ được duyệt
router.get('/list-news-waiting-for-approval', newsController.listNewsWaitingForApproval)
module.exports = router;