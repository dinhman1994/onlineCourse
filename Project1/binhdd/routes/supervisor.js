const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');

const supervisorController = require('../controllers/supervisor');
const userMiddleware = require('../middleware/user');
const supervisorMiddleware = require('../middleware/supervisor');
const authValidator = require('../validator/auth');
const courseValidator = require('../validator/course');
const upFile = require('../middleware/upfile');

router.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

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

router.put('/profile',authValidator.postUpdate,supervisorController.updateProfile);
router.post('/createCourse',courseValidator.postCreateNewCourse,supervisorController.createNewCourse);
router.post('/createTask/:courseId',courseValidator.postCreateTask,supervisorController.createTask);
router.post('/uploadDocument/:courseId',upFile.loadDocument,courseValidator.postUploadDocument,supervisorController.uploadDocument);
router.post('/checkAnswer/:taskInEnrollId',supervisorController.checkAnswer);
router.post('/addTrainee/:courseId/:traineeId',supervisorController.addTrainee);
router.post('/addSupervisor/:courseId/:supervisorId',supervisorController.addSupervisor);
router.post('/createCategory',courseValidator.postCreateCategory,supervisorController.createCategory);
router.post('/course/:courseId/makePublicCourse',supervisorController.makePublicCourse);
router.post('/updateCategory',courseValidator.postCreateCategory,supervisorController.updateCategory);
module.exports = router;
