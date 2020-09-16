var express = require('express');
var employeeController = require('../controller/employeeController');
var userValidator = require('../validator/userValidator');
var router = express.Router();

router.post('/delete', userValidator.isLoggedIn, employeeController.deleteAnEmployee);

router.get('/update', userValidator.isLoggedIn, employeeController.getEmployees)
router.post('/update', userValidator.isLoggedIn, employeeController.updateAnEmployee);

router.post('/edit', userValidator.isLoggedIn, employeeController.editAnEmployee);

router.get('/add-employee', userValidator.isLoggedIn, employeeController.displayForm);
router.post('/add-employee', userValidator.isLoggedIn, employeeController.addEmployee);

module.exports = router;


