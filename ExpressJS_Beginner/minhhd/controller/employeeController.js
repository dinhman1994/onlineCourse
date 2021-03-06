const Employee = require('../model/employee');
const employeeModel = Employee.EmployeeModel;
const Company = require('../model/company');
const companyModel = Company.CompanyModel;
const employeeValidator = require('../validator/employeeValidator').employeeValidator;
const { validationResult } = require('express-validator/check');

exports.addEmployee = [

    ...employeeValidator,

    async (req, res, next) => {
        let errors = validationResult(req);

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


    }
];

exports.displayForm = (req, res, next) => {

    companyModel.find().then(companies => {
        res.render('add-employee', { companies: companies });
    });

};

exports.getEmployees = async (req, res, next) => {

    let employees = await employeeModel.find().exec();
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

    const id = req.params.id;
    employeeModel.findOneAndDelete({ _id: id }).then((employee) => {
        console.log(`Deleted ${employee}`);
        res.redirect('/');
    }).catch(err => {
        throw err;
    });

};

exports.editAnEmployee = async (req, res, next) => {
    const id = req.params.id;

    let employee = await employeeModel.findOne({ _id: id }).exec();
    let companies = await companyModel.find().exec();

    res.render('edit-employee', {
        employee: employee,
        companies: companies
    });

};

exports.updateAnEmployee = [

    ...employeeValidator,

    async (req, res, next) => {
        const id = req.params.id;
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

    }
];