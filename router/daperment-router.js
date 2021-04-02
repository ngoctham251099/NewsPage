const express = require('express');
const router = express.Router();

const controllers = require('../controllers/department-controller');

router.get('/', controllers.showsDepartments);
router.post('/create', controllers.createDepartment);
router.delete('/delete/:id', controllers.deleteDepartment);
router.post('/edit/:id', controllers.editDepartment)
router.post('/update/:id', controllers.updateDepartment);
router.post('/viewById/:id', controllers.findById)
module.exports = router;