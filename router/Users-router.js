const express = require('express');
const router = express.Router();
const userController = require('../controllers/users/Users-controller');

router.get('/', userController.getUsers);
router.post('/signup', userController.postRegister);
router.post('/login', userController.postLogIn)
//create user 
router.post('/create', userController.createUser);
router.delete('/delete/:id', userController.delete)
router.post('/edit/:id', userController.editUser);
router.post('/update/:id', userController.updateUser);
router.post('/forgotPassword', userController.forgot);
router.get('/reset/:token', userController.resetPassword)
router.put('/updatePasswordViaEmail/:token', userController.updatePasswordViaEmail)


module.exports = router;