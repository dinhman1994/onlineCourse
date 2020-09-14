const User = require('../model/user');
const userModel = User.UserModel;
const Employee = require('../model/employee');
const employeeModel = Employee.EmployeeModel;

const async = require('async');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const bcrypt = require('bcryptjs');

exports.login = [

    body('username').isLength({ min: 1, max: 20 }).trim().withMessage('Username can not be empty or more than 20 characters.')
        .isAlphanumeric().withMessage('Username has non-alphanumeric characters'),
    body('password').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,72}$/, 'g').withMessage('Password must be longer than 8 or shorter than 72 characters, and must contain number.'),

    sanitizeBody('username').escape(),
    sanitizeBody('password').escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (errors.array().length !== 0) {
            res.render('login', { errors: errors.array() });
        }
        userModel.findOne({ username: req.body.username }).then(user => {
            if (!user) {
                res.render('login', { msg: 'User does not exist!' });
            }
            if (bcrypt.compareSync(req.body.password, user.password)) {
                req.session.user = req.body.username;
                async.parallel({
                    employees: (callback) => {
                        employeeModel.find().exec(callback);
                    },
                    totalEmployees: (callback) => {
                        employeeModel.countDocuments().exec(callback);
                    }
                }, function (err, results) {
                    if (err) {
                        next(err);
                    }
                    res.render('index', {
                        obj: 'Employees', title: 'Hello', employees: results.employees,
                        totalEmployees: results.totalEmployees, msg: `Welcome, ${req.body.username}`
                    });

                });
            } else {
                res.render('login', { msg: 'Wrong password' });
            }
        });


    }
];

exports.renderLogin = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/');
    } else {
        res.render('login');
    }
}

exports.renderRegister = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/');
    } else {
        res.render('register');
    }
}

exports.register = [

    body('username').isLength({ min: 1, max: 20 }).trim().withMessage('Username can not be empty or more than 20 characters.')
        .isAlphanumeric().withMessage('Username has non-alphanumeric characters.'),
    body('password').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,72}$/, 'g').withMessage('Password must be longer than 8 or shorter than 72 characters, and must contain number.'),
    body('repass').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,72}$/, 'g').withMessage('Re-Password must be longer than 8 or shorter than 72 characters, and must contain number.'),

    sanitizeBody('username').escape(),
    sanitizeBody('password').escape(),
    sanitizeBody('repass').escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        var password = req.body.password;
        var repass = req.body.repass;

        var salt = bcrypt.genSaltSync();
        hashedPass = bcrypt.hashSync(password, salt);

        var user = new User(req.body.username, hashedPass);
        var msg = '';
        if (errors.array().length !== 0) {
            if (repass !== password) {
                msg = 'Re-password does not match!';
            }
            res.render('register', { errors: errors.array(), msg: msg });
        }
        if (repass !== password) {
            msg = 'Re-password does not match!';
            res.render('register', { msg: msg });
        } else {
            userModel.findOne({ username: user.username }).then(u => {
                if (!u) {
                    userModel.create(user, (err) => {
                        if (err) {
                            throw err;
                        } else {
                            console.log(`Added user ${user.username}`);
                            res.render('login', { msg: 'Registered successfully! Please login!' });
                        }
                    });
                }
                res.render('register', { msg: 'Username already exists!' });
                Promise.reject(`${user.username} exists!`);
            });
        }
    }
];

exports.logout = (req, res, next) => {
    if (req.session.user) {
        req.session.user = null;
        res.redirect('/');
    } else {
        res.redirect('/');
    }
}