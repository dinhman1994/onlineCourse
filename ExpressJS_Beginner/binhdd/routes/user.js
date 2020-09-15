var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller.js');

router.get('/', controller.checkSession, controller.getUser, controller.userHome);
router.get('/history', controller.checkSession, controller.history);
router.get('/image', controller.checkSession, controller.showImage);
router.get('/profile', controller.checkSession, controller.getUser,controller.getProfile);

router.post('/', controller.postLogout);

module.exports = router;