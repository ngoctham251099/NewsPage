const express = require('express');
const router = express.Router();

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

router.post('/view/:id', newsController.viewsId);

//edit news
router.post('/edit/:id', newsController.editNews)

router.post('/update/:id', cpUpload, newsController.updateNews)

router.get('/viewFile/:name', newsController.viewsImages)
//vieư bai viet
router.post('/views-news/:id', newsController.viewsIdNews)

router.get('/viewsPower', newsController.statistical)

//view theo tung thang viet bai
router.get('/view-writer', newsController.viewsWriter)

router.post('/update-status/:id/:idNews', newsController.updateStatusManager)
router.post('/update-chief-editor/:id/:idNews', newsController.updateStatusPresident)
router.post('/update-refuse/:id/:idNews', newsController.updateStatusNoReview)
//update sts
//View list news theo department cho truong phong vaf status
router.get('/views-editor', newsController.viewsDepartment)
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

//Danh sách tin đã xac nhan
router.get('/list-news-comfirmed', newsController.listNewsConfirmed)

//----------------------------------
//Danh sách tin chờ được duyệt
router.get('/list-news-waiting-for-approval', newsController.listNewsWaitingForApproval)
module.exports = router;