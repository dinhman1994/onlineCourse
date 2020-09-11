var express = require('express');
var router = express.Router();
var userController = require('../controller/userController');

router.get('/login', userController.renderLogin);
router.post('/login', userController.login);

router.post('/register', userController.register);

router.get('/logout', userController.logout);

module.exports = router;