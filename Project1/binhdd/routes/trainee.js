const express = require('express');
const router = express.Router();


const traineeController = require('../controllers/trainee');
const userMiddleware = require('../middleware/user');
const traineeMiddleware = require('../middleware/trainee');
const authValidator = require('../validator/auth');

router.use(userMiddleware.checkToken);
router.use(traineeMiddleware.checkTrainee);

router.get('/',traineeController.trainee);
router.get('/yourCourses',traineeController.yourCourses);
router.get('/profile',traineeController.profile);
router.get('/yourCourses/:courseId',traineeController.seeCourse);
router.get('/course/:courseId/trainees',traineeController.seeTrainees);
router.get('/seeTrainee/:traineeId',traineeController.seeTrainee);
router.get('/search',traineeController.seeSearchTrainee);

router.post('/profile',authValidator.postUpdate,traineeController.updateProfile);
router.post('/course/:courseId',traineeMiddleware.checkSecretKey,traineeController.registerCourse);
router.post('/answerTask/:courseId/:taskId',traineeController.answerTask);
router.post('/answerTask/:taskInEnrollId',traineeController.answerAgain);
router.post('/report/:courseId',traineeController.makeReport);


module.exports = router;
