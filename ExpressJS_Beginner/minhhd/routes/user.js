const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const userValidator = require('../validator/userValidator');

router.get('/login', userController.renderLogin);
router.post('/login', userController.login);

router.get('/register', userController.renderRegister);
router.post('/register', userController.register);

router.get('/change-password', userValidator.isLoggedIn, userController.renderChangePassword);
router.post('/change-password', userValidator.isLoggedIn, userController.changePassword);

router.get('/logout', userValidator.isLoggedIn, userController.logout);

module.exports = router;
