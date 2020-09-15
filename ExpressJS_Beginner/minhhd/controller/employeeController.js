const Employee = require('../model/employee');
const employeeModel = Employee.EmployeeModel;
const Company = require('../model/company');
const companyModel = Company.CompanyModel;

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const async = require('async');

var employeeValidator = [
    body('first_name')
        .isLength({ min: 1, max: 100 })
        .trim()
        .withMessage('First name cannot be string or longer than 100 characters.')
        .isAlphanumeric()
        .withMessage('First name has non-alphanumeric characters.'),

    body('last_name')
        .isLength({ min: 1, max: 100 })
        .trim()
        .withMessage('Last name cannot be string or longer than 100 characters.')
        .isAlphanumeric().withMessage('Last name has non-alphanumeric characters.'),

    body('age')
        .isInt({ min: 18, max: 60 })
        .trim()
        .withMessage('Age can not be greater than 60 or less than 18 and can not be decimal.'),


    sanitizeBody('first_name').escape(),
    sanitizeBody('last_name').escape(),
    sanitizeBody('age').escape()
];

exports.addEmployee = [

    ...employeeValidator,

    async (req, res, next) => {
        if (req.session.user) {
            const errors = validationResult(req);

            let employee = new Employee(
                req.body.first_name,
                req.body.last_name,
                req.body.age,
                req.body.company
            );
            let msg = '';
            let err = null;

            let companies = await companyModel.find().exec();
            if (errors.array().length !== 0) {
                err = errors.array();
                res.render('add-employee', {
                    errors: err,
                    companies: companies
                });
            }

            employeeModel.create(employee, (error, result) => {
                if (error) {
                    throw error;
                } else {
                    console.log(`Added ${employee.first_name}!`);
                    msg = `Added ${employee.first_name}`;
                    res.render('add-employee', {
                        msg: msg,
                        companies: companies
                    });
                }
            });

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

exports.getEmployees = async (req, res, next) => {

    let employees = await employeeModel.findOne().exec();
    let totalEmployees = await employeeModel.countDocuments().exec();

    var username = req.session.user;
    res.render('index', {
        title: 'Hello',
        employees: employees,
        totalEmployees: totalEmployees,
        msg: `Welcome, ${username}`
    });
};

exports.deleteAnEmployee = (req, res, next) => {
    if (req.session.user) {
        const id = req.body.id.trim();
        employeeModel.findOneAndDelete({ _id: id }).then((employee) => {
            console.log(`Deleted ${employee.first_name}`);
            res.redirect('/');
        }).catch(err => {
            throw err;
        });
    } else {
        res.redirect('/login');
    }


};

exports.editAnEmployee = async (req, res, next) => {
    if (req.session.user) {
        const id = req.body.id.trim();

        let employee = await employeeModel.findOne({ _id: id }).exec();
        let companies = await companyModel.find().exec();

        res.render('edit-employee', {
            employee: employee,
            companies: companies
        });

    } else {
        res.redirect('/login');
    }
};

exports.updateAnEmployee = [

    ...employeeValidator,

    async (req, res, next) => {
        if (req.session.user) {
            const id = req.body.id.trim();
            const errors = validationResult(req);

            var employee = new Employee(
                req.body.first_name,
                req.body.last_name,
                req.body.age,
                req.body.company
            );
            var msg = '';
            var err = null;

            let companies = await companyModel.find().exec();


            if (errors.array().length !== 0) {
                err = errors.array();
                res.render('edit-employee', {
                    companies: companies,
                    employee: employee,
                    errors: err
                });
            }
            employeeModel.findByIdAndUpdate({ _id: id }, employee).exec(
                async (error, result) => {
                    if (error) {
                        throw error;
                    }

                    console.log(`Updated ${employee.first_name}`);
                    msg = `Updated ${employee.first_name}`;
                    let employeeDocument = await employeeModel.findOne({ _id: id }).exec();
                    res.render('edit-employee', {
                        msg: msg,
                        companies: companies,
                        employee: employeeDocument
                    });

                });


        } else {
            res.redirect('/login');
        }
    }
];