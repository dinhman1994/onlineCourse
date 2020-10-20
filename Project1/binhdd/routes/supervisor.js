const express = require('express');
const router = express.Router();


const supervisorController = require('../controllers/supervisor');
const userMiddleware = require('../middleware/user');

router.use(userMiddleware.checkToken);

router.get('/',supervisorController.supervisor);
router.get('/createCourse',supervisorController.createCourse);
router.get('/profile',supervisorController.profile);

module.exports = router;
