const express = require('express');
const router = express.Router();

const controllers = require('../controllers/kindOfNews-controller');

router.get('/', controllers.showsKindOfNews);
router.post('/create', controllers.createKindOfNews);
router.delete('/delete/:id', controllers.deleteKindOfNews);
router.post('/edit/:id', controllers.editKindOfNews)
router.post('/update/:id', controllers.updateKindOfNews);

module.exports = router;