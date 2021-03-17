const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const  newsController = require('../controllers/news-controller');

router.post('/upload', newsController.uploadImages )
router.get('/', newsController.showNews);
router.post('/create', newsController.create);
router.delete('/remove/:id', newsController.delete);
router.post('update/:id', newsController.update);
router.post('/view/:id', newsController.viewsId);

module.exports = router;