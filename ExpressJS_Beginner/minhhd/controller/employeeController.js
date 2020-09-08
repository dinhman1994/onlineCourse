const Employee = require('../model/employee');


exports.addEmployee = (req, res, next) => {
    var employee = new Employee({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age,
        company: req.body.company
    });
    var msg = '';
    if ((employee.age < 18 || employee.age > 60) 
    && (employee.first_name === '' || employee.last_name === '' || employee.age === '')) {
        console.log('Invalid input');
    } else {
        Employee.insertEmployee(employee);
        var msg = `Added ${employee.first_name}`;
        console.log(msg);
    }
    res.render('add-employee');

};

exports.displayForm = (req, res, next) => {
    res.render('add-employee');
};