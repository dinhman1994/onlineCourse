const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');

const traineeController = require('../controllers/trainee');
const userMiddleware = require('../middleware/user');
const traineeMiddleware = require('../middleware/trainee');
const authValidator = require('../validator/auth');

//methods overide
router.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
  }
}));

router.use(userMiddleware.checkToken);
router.use(traineeMiddleware.checkTrainee);

router.get('/',traineeController.trainee);

router.get('/yourCourses',traineeController.yourCourses);
router.get('/yourCourses/:courseId',traineeController.seeCourse);

router.get('/profile',traineeController.profile);
router.put('/profile',authValidator.postUpdate,traineeController.updateProfile);

router.get('/course/:courseId/trainees',traineeController.seeTrainees);
router.get('/seeTrainee/:traineeId',traineeController.seeTrainee);
router.get('/search',traineeController.seeSearchTrainee);


router.post('/course/:courseId',traineeMiddleware.checkSecretKey,traineeController.registerCourse);
router.post('/answerTask/:courseId/:taskId',traineeController.answerTask);
router.post('/answerTask/:taskInEnrollId',traineeController.answerAgain);
router.post('/report/:courseId',traineeController.makeReport);


module.exports = router;
