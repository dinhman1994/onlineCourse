var express = require('express');
var router = express.Router();
var userController = require('../controller/userController');

router.get('/login', userController.renderLogin);

router.post('/register', userController.register);

module.exports = router;