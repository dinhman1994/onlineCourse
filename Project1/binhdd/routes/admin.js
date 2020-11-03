const express = require('express');
const router = express.Router();


const adminController = require('../controllers/admin');
const userMiddleware = require('../middleware/user');
const adminMiddleware = require('../middleware/admin');
const validator = require('../validator/auth');

router.use(userMiddleware.checkToken);
router.use(adminMiddleware.checkAdmin);

router.get('/',adminController.admin);
router.get('/createCourse',adminController.createCourse);
router.get('/profile',adminController.profile);
router.get('/createCategory',adminController.category);


router.post('/createCategory',validator.postCreateCategory,adminController.createCategory);

module.exports = router;
