const Employee = require('../model/employee');
const { isValidObjectId } = require('mongoose');
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

    res.render('add-employee', { msg: msg });

};

exports.displayForm = (req, res, next) => {
    var msg = '';
    res.render('add-employee', { msg: msg });
};

exports.getEmployees = (req, res, next) => {
    employeeModel.find().then(employees => {
        res.render('index', { obj: 'Employees', title: 'Hello', employees: employees, msg: ''});
    });
};

exports.deleteAnEmployee = (req, res, next) => {
    const id = req.body.id.trim();
    employeeModel.findOneAndDelete({ _id: id }).then(() => {
        console.log(`Deleted id ${id}`);
        res.redirect('/');
    }).catch(err => {
        console.log(err);
    });

};

exports.editAnEmployee = (req, res, next) => {
    const id = req.body.id.trim();
    console.log(id);
    employeeModel.findOne({_id: id}).then(employee => {
        console.log(employee);
        res.render('edit-employee', {employee: employee});
    });
};

exports.updateAnEmployee = (req, res, next) => {
    const id = req.body.id.trim();
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
        employeeModel.findByIdAndUpdate({_id: id}, employee).then(() => {
            console.log('Updated');
        });
        employeeModel.find().then(employees => {
            msg = 'Updated successfully!'
            res.render('index', { obj: 'Employees', title: 'Hello', employees: employees, msg: ''});
        });
    }

};