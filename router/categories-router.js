const express = require('express');
const router = express.Router();

const controllers = require('../controllers/categories-controller');

router.get('/', controllers.showsCategories);
router.post('/create', controllers.createCategories);
router.delete('/delete/:id', controllers.deleteCategories);
router.post('/edit/:id', controllers.editCategories)
router.post('/update/:id', controllers.updateCategories);
router.post('/viewById/:id', controllers.findById)
module.exports = router;