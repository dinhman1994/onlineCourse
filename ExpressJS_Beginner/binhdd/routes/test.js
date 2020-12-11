var express = require('express');
var router = express.Router();
var testController = require('../controllers/testController.js');
var multer  = require('multer');

var upload = multer({ dest: './public/images/' });

// GET home page.
router.get('/', testController.index);

module.exports = router;