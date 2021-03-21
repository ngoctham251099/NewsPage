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

module.exports = router;