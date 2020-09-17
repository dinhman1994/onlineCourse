var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller.js');
var multer  = require('multer');

var upload = multer({ dest: './public/images/' });

// GET home page.
router.get('/', controller.index);
router.get('/login' , controller.login);
router.get('/signup' , controller.signup);
router.get('/listUsers',controller.listUsers);
router.get('/checkUser',controller.checkUser);

router.post('/login', controller.checkLogin, controller.doneLogin);
router.post('/signup',
	controller.loadImage,
	controller.createUser,
	controller.doneSignup);

module.exports = router;
