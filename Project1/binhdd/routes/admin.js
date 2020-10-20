const express = require('express');
const router = express.Router();


const adminController = require('../controllers/admin');
const userMiddleware = require('../middleware/user');

router.use(userMiddleware.checkToken);

router.get('/',adminController.admin);
router.get('/createCourse',adminController.createCourse);
router.get('/profile',adminController.profile);

module.exports = router;
