var express = require('express');
var router = express.Router();
var controller_index = require('../controllers/controller_index.js');
var multer  = require('multer');

var upload = multer({ dest: './public/images/' });

// GET home page.
router.get('/', controller_index.index);
router.get('/login' , controller_index.login);
router.get('/signup' , controller_index.signup);
router.get('/checkUser',controller_index.checkUser);

router.post('/login', controller_index.checkLogin, controller_index.doneLogin);
router.post('/signup',
	controller_index.loadImage,
	controller_index.createUser,
	controller_index.doneSignup);

module.exports = router;
