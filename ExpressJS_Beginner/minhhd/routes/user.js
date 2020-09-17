const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const userMiddleware = require('../middleware/userMiddleware');

router.get('/login', userController.renderLogin);
router.post('/login', userController.login);

router.get('/register', userController.renderRegister);
router.post('/register', userController.register);

router.get('/change-password', userMiddleware.isLoggedIn, userController.renderChangePassword);
router.post('/change-password', userMiddleware.isLoggedIn, userController.changePassword);

router.get('/logout', userMiddleware.isLoggedIn, userController.logout);

router.get('/api/v1/user/:username', userMiddleware.isLoggedIn, userController.getUser);

module.exports = router;
