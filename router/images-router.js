const express = require('express');
const router = express.Router();

const controllers = require('../controllers/images-controller');

router.get('/', controllers.showsImages);
router.post('/create', controllers.createImages);
router.delete('/delete/:id', controllers.deleteNewImages);
router.post('/edit/:id', controllers.editKindOfNews)
router.post('/update/:id', controllers.updateImages);

module.exports = router;