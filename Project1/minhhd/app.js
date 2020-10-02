const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const fs = require('fs');
const rfs = require('rotating-file-stream');
const moment = require('moment');
const generator = require('./util/generator');
const indexRouter = require('./routes/index');
const defaultMiddleware = require('./middleware/default');
const staticSetting = require('./statics/index');
const { sequelize } = require('./models/index');

dotenv.config();
const app = express();

// use cors for api
app.use(cors());

// store logs
const accessLogStream = rfs.createStream(generator.logFileGenerator(), {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'storage/logs'),
});
app.use(logger('combined', { stream: accessLogStream }));
app.use(logger('dev'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// connect database
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection OK!');
  })
  .catch((error) => {
    console.log('Unable to connect to the database:');
    console.log(error.message);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true,
  }),
);

staticSetting.forEach((setting) => app.use(...setting));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// define list routers
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// use middleware
app.use(...defaultMiddleware);

module.exports = app;
