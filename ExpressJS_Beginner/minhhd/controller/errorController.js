var createError = require('http-errors');

exports.notFoundHandle = function(req, res, next) {
    next(createError(404));
};