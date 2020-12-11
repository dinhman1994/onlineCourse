const express = require('express');
const router = express.Router();


const adminController = require('../controllers/admin');
const userMiddleware = require('../middleware/user');
const adminMiddleware = require('../middleware/admin');
const validator = require('../validator/auth');
const supervisorController = require('../controllers/supervisor');


router.use(userMiddleware.checkToken);
router.use(adminMiddleware.checkAdmin);

router.get('/manage',adminController.manage);

router.post('/deleteTrainee/:traineeId',adminController.deleteTrainee);
router.post('/unblockTrainee/:traineeId',adminController.unblockTrainee);

module.exports = router;
