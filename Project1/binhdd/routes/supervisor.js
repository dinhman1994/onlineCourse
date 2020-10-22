const express = require('express');
const router = express.Router();


const supervisorController = require('../controllers/supervisor');
const userMiddleware = require('../middleware/user');
const supervisorMiddleware = require('../middleware/supervisor');
const validator = require('../validator/auth');

router.use(userMiddleware.checkToken);
router.use(supervisorMiddleware.checkSupervisor);

router.get('/',supervisorController.supervisor);
router.get('/createCourse',supervisorController.createCourse);
router.get('/profile',supervisorController.profile);


router.post('/profile',validator.postUpdate,supervisorController.updateProfile);

module.exports = router;
