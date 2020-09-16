const { body } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


var loginValidator = [
    body('username').isLength({ min: 1, max: 20 }).
        trim().
        withMessage('Username can not be empty or more than 20 characters.')
        .isAlphanumeric().withMessage('Username has non-alphanumeric characters'),
    body('password')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,72}$/, 'g')
        .withMessage('Password must be longer than 8 or shorter than 72 characters, and must contain number.'),

    sanitizeBody('username').escape(),
    sanitizeBody('password').escape()
];


exports.loginValidator = loginValidator;

exports.registerValidator = [
    ...loginValidator,
    body('repass').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,72}$/, 'g')
        .withMessage('Re-Password must be longer than 8 or shorter than 72 characters, and must contain number.'),

    sanitizeBody('repass').escape()
];

exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};