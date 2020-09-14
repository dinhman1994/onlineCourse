const Employee = require('../model/employee');
const employeeModel = Employee.EmployeeModel;
const Company = require('../model/company');
const companyModel = Company.CompanyModel;

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const async = require('async');

exports.addEmployee = [

    body('first_name').isLength({ min: 1, max: 100 }).trim().withMessage('First name cannot be string or longer than 100 characters.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('last_name').isLength({ min: 1, max: 100 }).trim().withMessage('First name cannot be string or longer than 100 characters.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('age').isInt({ min: 18, max: 60 }).trim().withMessage('Age can not be greater than 60 or less than 18'),


    sanitizeBody('first_name').escape(),
    sanitizeBody('last_name').escape(),
    sanitizeBody('age').escape(),

    (req, res, next) => {
        if (req.session.user) {
            const errors = validationResult(req);

            var employee = new Employee(
                req.body.first_name,
                req.body.last_name,
                req.body.age,
                req.body.company
            );
            var msg = '';
            var err = null;
            if (errors.array().length !== 0) {
                err = errors.array();
            } else {
                employeeModel.create(employee, (error) => {
                    if (error) {
                        throw error;
                    } else {
                        console.log(`Added ${employee.first_name}`);
                        msg = `Added ${employee.first_name}`;
                    }
                });
            }
            res.render('add-employee', { msg: msg, errors: err });
        } else {
            res.redirect('/login');
        }

    }
];

exports.displayForm = (req, res, next) => {
    if (req.session.user) {
        companyModel.find().then(companies => {
            res.render('add-employee', { companies: companies });
        });
    } else {
        res.redirect('/login');
    }
};

exports.getEmployees = (req, res, next) => {
    async.parallel({
        employees: (callback) => {
            employeeModel.find().exec(callback);
        },
        totalEmployees: (callback) => {
            employeeModel.countDocuments().exec(callback);
        }
    }, function (err, results) {
        if (err) {
            throw err;
        } else {
            var username = req.session.user;
            res.render('index', {
                obj: 'Employees', title: 'Hello', employees: results.employees,
                totalEmployees: results.totalEmployees, msg: `Welcome, ${username}`
            });
        }
    });
};

exports.deleteAnEmployee = (req, res, next) => {
    if (req.session.user) {
        const id = req.body.id.trim();
        employeeModel.findOneAndDelete({ _id: id }).then(() => {
            console.log(`Deleted id ${id}`);
            res.redirect('/');
        }).catch(err => {
            throw err;
        });
    } else {
        res.redirect('/login');
    }


};

exports.editAnEmployee = (req, res, next) => {
    if (req.session.user) {
        const id = req.body.id.trim();
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
    } else {
        res.redirect('/login');
    }

};

exports.updateAnEmployee = [
    body('first_name').isLength({ min: 1, max: 100 }).trim().withMessage('First name cannot be string or longer than 100 characters.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('last_name').isLength({ min: 1, max: 100 }).trim().withMessage('Last name cannot be string or longer than 100 characters.')
        .isAlphanumeric().withMessage('Last name has non-alphanumeric characters.'),
    body('age').isInt({ min: 18, max: 60 }).trim().withMessage('Age can not be greater than 60 or less than 18 or must be changed to update.'),

    sanitizeBody('first_name').escape(),
    sanitizeBody('last_name').escape(),
    sanitizeBody('age').escape(),

    (req, res, next) => {
        if (req.session.user) {
            const id = req.body.id.trim();
            const errors = validationResult(req);

            var employee = new Employee(req.body.first_name,
                req.body.last_name,
                req.body.age,
                req.body.company
            );
            var msg = '';
            var err = null;
            if (errors.array().length !== 0) {
                err = errors.array();
            } else {
                employeeModel.findByIdAndUpdate({ _id: id }, employee).exec((error, result) => {
                    if (error) {
                        throw error;
                    } else {
                        console.log(`Updated ${employee.first_name}`);
                        msg = `Updated ${employee.first_name}`;
                    }
                });
            }

            async.parallel({
                companies: (callback) => {
                    companyModel.find().exec(callback);
                },
                employee: (callback) => {
                    employeeModel.findOne({ _id: id }).exec(callback);
                }
            }, function (error, results) {
                if (error) {
                    throw error;
                } else {
                    res.render('edit-employee', { msg: msg, companies: results.companies, employee: results.employee, errors: err });
                }
            });
        } else {
            res.redirect('/login');
        }
    }
];