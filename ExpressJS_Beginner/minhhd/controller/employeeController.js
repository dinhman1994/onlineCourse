const Employee = require('../model/employee');
const employeeModel = Employee.EmployeeModel;

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
        msg = 'Invalid input';
    } else {
        employeeModel.create(employee, (err, Employee) => {
            if (err) {
                throw err;
            } else {    
                console.log(`Added ${employee.first_name}`);
            }
        });
        msg = `Added ${employee.first_name}`;
    }

    res.render('add-employee', {msg: msg});

};

exports.displayForm = (req, res, next) => {
    var msg = '';
    res.render('add-employee', {msg: msg});
};

exports.getEmployees = (req, res, next) => {
    employeeModel.find().then(employees => {
        res.render('index', {obj: 'Employees', title: 'Hello', employees: employees});
    });
};