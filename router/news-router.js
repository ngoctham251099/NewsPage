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
        cb(null, new Date().toISOString() + file.originalname)
    }
})
const upload = multer({storage : storage})

const  newsController = require('../controllers/news-controller');

// router.post('/upload', newsController.uploadImages )
router.get('/', newsController.showNews);
router.post('/create', upload.single('avatar'),newsController.create);
router.delete('/remove/:id', newsController.delete);
router.post('update/:id', newsController.update);
router.post('/view/:id', newsController.viewsId);

module.exports = router;