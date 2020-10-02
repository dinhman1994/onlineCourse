const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.employeeValidator = [
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
