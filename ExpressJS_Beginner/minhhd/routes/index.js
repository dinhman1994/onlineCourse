var express = require('express');
var employeeController = require('../controller/employeeController');
var router = express.Router();

/* GET home page. */
router.get('/', employeeController.getEmployees);
router.post('/delete', employeeController.deleteAnEmployee);

router.post('/update', employeeController.updateAnEmployee);

router.post('/edit', employeeController.editAnEmployee);

router.get('/add-employee', employeeController.displayForm);
router.post('/add-employee', employeeController.addEmployee);



module.exports = router;
