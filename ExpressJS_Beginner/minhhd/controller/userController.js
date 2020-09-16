const User = require('../model/user');
const userModel = User.UserModel;
const Employee = require('../model/employee');
const employeeModel = Employee.EmployeeModel;
const userValidator = require('../validator/userValidator');
const { validationResult } = require('express-validator/check');

const bcrypt = require('bcryptjs');



exports.login = [
    userValidator.loginValidator,

    async (req, res, next) => {

        const errors = validationResult(req);

        if (errors.array().length !== 0) {
            res.render('login', { errors: errors.array() });
        }

        let user = await userModel.findOne({ username: req.body.username }).exec();

        if (!user) {
            res.render('login', { msg: 'User does not exist!' });
        }

        if (!bcrypt.compareSync(req.body.password, user.password)) {
            res.render('login', { msg: 'Wrong password!' });
        }

        req.session.user = req.body.username;
        res.locals.user = req.body.username;
        let employees = await employeeModel.find().exec();
        let totalEmployees = await employeeModel.countDocuments().exec();

        res.render('index', {
            title: 'Hello',
            msg: `Welcome, ${req.body.username}`,
            totalEmployees: totalEmployees,
            employees: employees
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

    userValidator.registerValidator,



    async (req, res, next) => {
        const errors = validationResult(req);

        var password = req.body.password;
        var repass = req.body.repass;


        var msg = '';
        if (repass !== password) {
            msg = 'Re-password does not match!';
            res.render('register', {
                errors: errors.array(),
                msg: msg
            });
        }
        if (errors.array().length !== 0) {

            res.render('register', {
                errors: errors.array(),
                msg: msg
            });
        }

        let user = new User(req.body.username, encodePassword(password));

        let existedUser = await userModel.findOne({ username: user.username }).exec();

        if (existedUser) {
            res.render('register', { msg: 'Username already exists!' });
            Promise.reject(`${user.username} exists!`);
        } else {
            userModel.create(user, (err) => {
                if (err) {
                    throw err;
                }
                console.log(`Added user ${user.username}`);
                msg = 'Registered successfully! Please login!';
                res.render('login', { msg: msg });
            });
        }

    }
];

exports.logout = (req, res, next) => {
    req.session.user = null;
    res.redirect('/');
}

function encodePassword(password) {
    var salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
}

exports.renderChangePassword = async (req, res, next) => {

    let user = await userModel.findOne({ username: req.session.user }).exec();
    res.render('change-password', { user: user });

}

exports.changePassword = [

    userValidator.registerValidator,

    async (req, res, next) => {
        const errors = validationResult(req);

        var password = req.body.password;
        var repass = req.body.repass;
        var username = req.session.user;

        var msg = '';

        let existedUser = await userModel.findOne({ username: req.session.user }).exec();

        if (repass !== password) {
            msg = 'Re-password does not match!';
            res.render('change-password', {
                errors: errors.array(),
                msg: msg,
                user: existedUser
            });
        }
        if (errors.array().length !== 0) {

            res.render('change-password', {
                errors: errors.array(),
                msg: msg,
                user: existedUser
            });
        }

        let user = new User(req.body.username, encodePassword(password));

        userModel
            .findOneAndUpdate({ username: username }, user)
            .exec((err, result) => {
                if (err) {
                    throw err;
                }

                console.log(`${user.username}changed password successfully`);
                msg = 'Password changed successfully';
                res.render('change-password', {
                    msg: msg,
                    user: user
                });

            })
    }
];

exports.getUser = (req, res, next) => {
    let username = req.params.username;

    userModel.findOne({ username: username }).then(user => {
        if (user) {
            return res.status(200).send(user);
        } else {
            next();
        }
    });
};