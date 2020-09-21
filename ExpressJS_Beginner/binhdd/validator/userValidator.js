const { body } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.loginValidator = [
	body('userName', 'userName name required').isLength({ min: 1 }).trim(),
 	body('password', 'password name required').isLength({ min: 1 }).trim(), 
  // Sanitize (escape) the name field.

];

exports.signupValidator = [
	body('userName', 'UserName name required at least 2 characters').isLength({ min: 2 }).trim(),
	body('password', 'Password required at least 6 characters').isLength({ min: 6 }).trim(),
	body('name', 'Name required at least 2 characters').isLength({ min: 2 }).trim(),
	body('date_of_birth', 'Date_of_birth is required').isLength({ min: 2 }).trim(),

	sanitizeBody('userName').escape(),
	sanitizeBody('password').escape(),
	sanitizeBody('name').escape(),
	sanitizeBody('date_of_birth').escape(),
];