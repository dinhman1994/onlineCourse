var createError = require('http-errors');

module.exports.notFoundHandle = function(req, res, next) {
    next(createError(404));
};