const express = require('express');
const router = express.Router();


const supervisorController = require('../controllers/supervisor');
const userMiddleware = require('../middleware/user');
const supervisorMiddleware = require('../middleware/supervisor');
const validator = require('../validator/auth');
const upFile = require('../middleware/upfile');

router.use(userMiddleware.checkToken);
router.use(supervisorMiddleware.checkSupervisor);

router.get('/',supervisorController.supervisor);
router.get('/createCourse',supervisorController.createCourse);
router.get('/profile',supervisorController.profile);
router.get('/course/:courseId',supervisorController.seeCourse);
router.get('/course/:courseId/trainees',supervisorController.seeTrainees);
router.get('/seeAnswers/:courseId/:traineeId',supervisorController.seeAnswers);
router.get('/seeTrainee/:traineeId',supervisorController.seeTrainee);
router.get('/seeSupervisor/:supervisorId',supervisorController.seeSupervisor);
router.get('/course/:courseId/addSupervisor',supervisorController.seeSupervisors);
router.get('/createCategory',supervisorController.category);

router.post('/profile',validator.postUpdate,supervisorController.updateProfile);
router.post('/createCourse',validator.postCreateNewCourse,supervisorController.createNewCourse);
router.post('/createTask/:courseId',validator.postCreateTask,supervisorController.createTask);
router.post('/uploadDocument/:courseId',upFile.loadDocument,validator.postUploadDocument,supervisorController.uploadDocument);
router.post('/checkAnswer/:taskInEnrollId',supervisorController.checkAnswer);
router.post('/addTrainee/:courseId/:traineeId',supervisorController.addTrainee);
router.post('/addSupervisor/:courseId/:supervisorId',supervisorController.addSupervisor);
router.post('/createCategory',supervisorController.createCategory);
router.post('/course/:courseId/makePublicCourse',supervisorController.makePublicCourse);
module.exports = router;
