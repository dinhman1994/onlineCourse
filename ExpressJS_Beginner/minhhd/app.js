var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('cookie-session');
require('dotenv').config();

var indexRouter = require('./routes/index');
var companyRouter = require('./routes/company');
var userRouter = require('./routes/user');
var errorController =  require('./controller/errorController');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'session secret',
  resave: false,
  saveUninitialized: false
}));

app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  next();
  });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/company',companyRouter);
app.use(userRouter);

// setup mongoose connection
var mongoose = require('mongoose');
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/employee_db';
mongoose.connect(url, {useNewUrlParser: true},(err) => {
  if (!err) {
    console.log('Connected to database');
  } else{
    console.error(err.stack);
  }
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

// catch 404 and forward to error handler
app.use(errorController.notFoundHandle);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
