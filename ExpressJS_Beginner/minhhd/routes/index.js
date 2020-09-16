const express = require('express');
const employeeController = require('../controller/employeeController');
const router = express.Router();

/* GET home page. */
router.get('/', employeeController.getEmployees);


module.exports = router;
