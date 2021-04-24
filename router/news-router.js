const express = require('express');
const router = express.Router();
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
router.delete('/remove/:id', newsController.deleteNews);

router.post('/view/:id', newsController.viewsId);

//edit news
router.post('/edit/:id', newsController.editNews)

router.post('/update/:id', cpUpload, newsController.updateNews)

router.get('/viewFile/:name', newsController.viewsImages)
//vieư bai viet
router.post('/views-news/:id', newsController.viewsIdNews)

router.get('/viewsPower', newsController.statistical)

//thu ky
router.post('/update-secretary/:id/:idNews', newsController.updateStatusSecretary)

//view theo tung thang viet bai
router.get('/view-writer', newsController.viewsWriter)

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

router.post('/statisticalByAuthor', newsController.statisticalByAuthor )
router.get('/statisticalByAuthor2', newsController.statisticalByAuthor2 )


//Thống kê từ tháng này đến tháng kia
router.post('/statisticalFromMonthtoMonth', newsController.statisticalFromMonthtoMonth)
//Thống kê theo năm
router.post('/statisticalFromYear', newsController.statisticalFromYear)
//Thống kê theo tên Bút danh
router.post('/statisticalAuthor', newsController.statisticalAuthor)

//----------------------------------
//Danh sách tin đã được duyệt
router.get('/list-news-approved', newsController.listNewsApproved)

//Danh sách tin đã xac nhan
router.get('/list-news-comfirmed', newsController.listNewsConfirmed)

//----------------------------------
//Danh sách tin chờ được duyệt
router.get('/list-news-waiting-for-approval', newsController.listNewsWaitingForApproval)

//danh sach cua bien tap vien
router.get('/list-news-BTV', newsController.listNewBTV);

//danh sach phe duyet cua bien tap vien
router.get('/list-btv-approved', newsController.listNewsBTV2)
router.get('/list-tbbt-approved', newsController.listNewsTBBT)
//danh sach tu choi cua btv and TBBT
router.get('/list-news-btv-refuse', newsController.listBTVRefuse)
router.get('/list-news-tbbv-refuse', newsController.listTBBTRefuse)

//yeu cau chinh sua bai viet
router.post('/news-edit-content/:id/:idNews', newsController.updateStatusEditContent)

//danh sach yeu cau chinh sua cua bien tap vien
router.get('/list-news-request-edit', newsController.listNewsRequestEdit)


router.get('/list-catetory', newsController.listCategory)
router.post('/list-news-by-caterogy/:id', newsController.listNewsbyCategory)
router.post('/list-news-by-id/:id', newsController.NewsById )

module.exports = router;