const Employee = require('../model/employee');
const employeeModel = Employee.EmployeeModel;
const Company = require('../model/company');
const companyModel = Company.CompanyModel;
const validator = require('../model/validator');

var async = require('async');

exports.addEmployee = (req, res, next) => {
    var employee = new Employee({
        first_name: req.body.first_name.trim(),
        last_name: req.body.last_name.trim(),
        age: req.body.age.trim(),
        company: req.body.company.trim()
    });
    var msg = '';
    if (validator.isValidString(employee.first_name) && validator.isValidString(employee.last_name) && validator.isValidNumber(employee.age, 18, 60)) {
        employeeModel.create(employee, (err) => {
            if (err) {
                throw err;
            } else {
                console.log(`Added ${employee.first_name}`);
            }
        });
        msg = `Added ${employee.first_name}`;
    } else {
        if (!validator.isValidString(employee.first_name)) {
            msg = 'First name is empty!';
        } else if (!validator.isValidString(employee.last_name)) {
            msg = 'Last name is empty!';
        } else if (!validator.isValidString(employee.age)) {
            msg = 'Age is empty';

        } else if (!validator.isValidNumber(employee.age, 18, 60)) {
            msg = 'Age cannot be greater than 60 or less than 18';
        }
    }

    companyModel.find().then(companies => {
        res.render('add-employee', { msg: msg, companies: companies });
    });

};

exports.displayForm = (req, res, next) => {
    var msg = '';
    companyModel.find().then(companies => {
        res.render('add-employee', { msg: msg, companies: companies });
    });

};

exports.getEmployees = (req, res, next) => {

    async.parallel({
        employees: (callback) => {
            employeeModel.find().exec(callback);
        },
        totalEmployees: (callback) => {
            employeeModel.countDocuments().exec(callback);
        },
        totalCompanies: (callback) => {
            companyModel.countDocuments().exec(callback);
        }
    }, function (err, results) {
        if (err) {
            console.log(err);
            next(err);
        } else {
            res.render('index', {
                obj: 'Employees', title: 'Hello', employees: results.employees,
                totalEmployees: results.totalEmployees, totalCompanies: results.totalCompanies
            });
        }
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
    async.parallel({
        employee: (callback) => {
            employeeModel.findOne({ _id: id }).exec(callback);
        },
        companies: (callback) => {
            companyModel.find().exec(callback);
        }
    }, function (err, results) {
        if (err) {
            throw err;
        } else {
            res.render('edit-employee', { employee: results.employee, companies: results.companies });
        }
    });

};

exports.updateAnEmployee = (req, res, next) => {
    const id = req.body.id.trim();
    var employee = new Employee({
        first_name: req.body.first_name.trim(),
        last_name: req.body.last_name.trim(),
        age: req.body.age.trim(),
        company: req.body.company.trim()
    });


    var msg = '';
    if (validator.isValidString(employee.first_name) && validator.isValidString(employee.last_name) && validator.isValidNumber(employee.age, 18, 60)) {
        employeeModel.findByIdAndUpdate({ _id: id }, employee).exec((err, results) => {
            if (err) {
                throw err;
            }
        });
        console.log(`Updated ${employee.first_name} ${employee.last_name}`);
        msg = 'Updated successfully!';
    } else {
        if (!validator.isValidString(employee.first_name)) {
            msg = 'First name is empty!';
        } else if (!validator.isValidString(employee.last_name)) {
            msg = 'Last name is empty!';
        } else if (!validator.isValidString(employee.age)) {
            msg = 'Age is empty';

        } else if (!validator.isValidNumber(employee.age, 18, 60)) {
            msg = 'Age cannot be greater than 60 or less than 18';
        }
        
    }
    async.parallel({
        employee: (callback) => {
            employeeModel.findOne({ _id: id }).exec(callback);
        },
        companies: (callback) => {
            companyModel.find().exec(callback);
        }
    }, function (err, results) {
        if (err) {
            throw err;
        }
        res.render('edit-employee', { msg: msg, companies: results.companies, employee: results.employee });
    })
    

};