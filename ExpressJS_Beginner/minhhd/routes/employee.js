var express = require('express');
var employeeController = require('../controller/employeeController');
var userMiddleware = require('../middleware/userMiddleware');
var methodOverride = require('method-override');
var router = express.Router();

router.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

router.delete('/:id', employeeController.deleteAnEmployee);

router.get('/', userMiddleware.isLoggedIn, employeeController.getEmployees);
router.put('/:id', userMiddleware.isLoggedIn, employeeController.updateAnEmployee);

router.post('/:id/edit', userMiddleware.isLoggedIn, employeeController.editAnEmployee);

router.get('/new', userMiddleware.isLoggedIn, employeeController.displayForm);
router.post('/', userMiddleware.isLoggedIn, employeeController.addEmployee);

module.exports = router;


