var express = require('express');
var router = express.Router();
var userController = require('../controller/userController');

router.get('/login', userController.renderLogin);
router.post('/login', userController.login);

router.get('/register', userController.renderRegister);
router.post('/register', userController.register);

router.get('/change-password', userController.renderChangePassword);
router.post('/change-password', userController.changePassword);

router.get('/logout', userController.logout);

module.exports = router;