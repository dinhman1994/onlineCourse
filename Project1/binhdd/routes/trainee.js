const express = require('express');
const router = express.Router();


const traineeController = require('../controllers/trainee');
const userMiddleware = require('../middleware/user');

router.use(userMiddleware.checkToken);

router.get('/',traineeController.trainee);
router.get('/yourCourses',traineeController.yourCourses);
router.get('/profile',traineeController.profile);

module.exports = router;
