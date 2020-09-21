var express = require('express');
var router = express.Router();
var controller_user = require('../controllers/controller_user.js');

var sessionMiddleware = require('../middleware/sessionMiddleware');

router.use(sessionMiddleware.checkSession);

router.get('/', controller_user.getUser, controller_user.userHome);
router.get('/history', controller_user.history);
router.get('/image', controller_user.showImage);
router.get('/profile', controller_user.getUser,controller_user.getProfile);

router.post('/', controller_user.postLogout);

module.exports = router;
