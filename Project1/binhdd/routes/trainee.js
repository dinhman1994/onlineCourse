const express = require('express');
const router = express.Router();


const traineeController = require('../controllers/trainee');
const userMiddleware = require('../middleware/user');
const traineeMiddleware = require('../middleware/trainee');
const validator = require('../validator/auth');

router.use(userMiddleware.checkToken);
router.use(traineeMiddleware.checkTrainee);

router.get('/',traineeController.trainee);
router.get('/yourCourses',traineeController.yourCourses);
router.get('/profile',traineeController.profile);


router.post('/profile',validator.postUpdate,traineeController.updateProfile);

module.exports = router;
