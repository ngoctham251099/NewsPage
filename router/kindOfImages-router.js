const express = require('express');
const router = express.Router();

const controllers = require('../controllers/kindOfImages-controller');

router.get('/', controllers.showsKindOfImages);
router.post('/create', controllers.createKindOfImages);
router.delete('/delete/:id', controllers.deleteKindOfImages);
router.post('/edit/:id', controllers.editKindOfImages)
router.post('/update/:id', controllers.updateKindOfImages);

module.exports = router;