const { body, validationResult } = require('express-validator');
const fs = require('fs');

const courseService = require('../services/courseService');

var changeNameFile = (oldPath,newPath) => new Promise(function(resolve,reject){
  fs.rename(oldPath, newPath, (err) => {
    if(err)
      reject(oldPath);
    resolve(newPath);
  }); 
});

exports.postLogin = [
  body('email','Email is required field').isEmail(),
  body('password','Password is required field').not().isEmpty(),
  (req, res, next) => {
    let page;
    switch(req.url){
      case '/login':
        page = 1;
        break;
      case '/supervisor_login':
        page = 2;
        break;
      case '/admin_login':
        page = 3;
        break;
      default:
        page = 1;
    }
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
    	console.log(errors);
      return res.render('auth/login', { errs: errors.errors, page:page});
    }

    next();
  },
];



exports.postRegister = [
  body('email','Email is required field').isEmail(),
  body('password','Password is required field').not().isEmpty(),
  body('retype_password','Retype password is required field').not().isEmpty(),
  body('name','Name is required field').not().isEmpty().isLength({ min: 2, max: 15 }),
  body('tel','Telephone is required field').not().isEmpty(),
  body('tel','Telephone is invalid').custom(value => {
    return (+value && value.length === 10);
  }),
  body('birthday','Birthday is required').not().isEmpty(),
  body('birthday','Birthday is invalid').custom(value => {
    if(!value) return false;
    const date = new Date(value);
    console.log("date is" +date);
    const d1 = new Date(1960,1,1);
    const d2 = new Date(2018,1,1);
    return (d1.getTime()<date.getTime() && d2.getTime()>date.getTime());
  }),
  body('terms','You must agree with our terms').equals('agree'),
  (req, res, next) => {
    let page;
    switch(req.url){
      case '/register':
        page = 1;
        break;
      case '/supervisor_register':
        page = 2;
        break;
      case '/admin_register':
        page = 3;
        break;
      default:
        page = 1;
    }
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('auth/register', { errs: errors.errors,page: page });
    }

    if(req.body.password != req.body.retype_password){
      const error = new Error('You must type password and retype_password the same !');
      return res.render('auth/register', { error:error, page: page });
    }

    return next();
  },
];


exports.postUpdate = [
  body('email','Email is required field').isEmail(),
  body('password','Password is required field').not().isEmpty(),
  body('retype_password','Retype password is required field').not().isEmpty(),
  body('name','Name is required field').not().isEmpty().isLength({ min: 2, max: 30 }),
  body('tel','Telephone is required field').not().isEmpty(),
  body('tel','Telephone is invalid').custom(value => {
    return (+value && value.length === 10);
  }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      if(req.session.user.userType === 'trainee')
        return res.render('profile', { user:req.session.user, errs: errors.errors});
      return res.render('supervisorProfile', { user:req.session.user, errs: errors.errors});
    }

    if(req.body.password != req.body.retype_password){
      const error = new Error('You must type password and retype_password the same !');
      if(req.session.user.userType === 'trainee')
        return res.render('profile', { user:req.session.user, error:error });
      return res.render('supervisorProfile', { user:req.session.user, error:error });
    }

    return next();
  },
];

exports.postCreateNewCourse = [
  body('name','Name is required field').not().isEmpty().isLength({ min: 2, max: 15 }),
  body('timeOfCourse','Time Of Course is required field').not().isEmpty(),
  body('timeOfCourse','Time Of Course must be number from 1 to 10 ').custom(value => {
    return (+value && +value>=1 && +value<10);
  }),
  body('createDay','Create Day is required').not().isEmpty(),
  body('statusCourse','Status Course is required').not().isEmpty(),
  body('typeOfCourse','Type Of Course is required').not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('createCourse', { user:req.session.user, errs: errors.errors, categories:req.session.categories});
    }
    if (req.body.categoryName === undefined){
      const error = new Error('You must have choose category for the Course');
      return res.render('createCourse', { user:req.session.user, error:error, categories:req.session.categories});
    }
    if (req.body.typeOfCourse === 'limited')
    {
      if(req.body.secretKey === '')
      {
        const error = new Error('You must have SecretKey in limited Course');
        return res.render('createCourse', { user:req.session.user, error:error, categories:req.session.categories});
      }
    }

    return next();
  }
];

exports.postCreateCategory = [
  body('categoryName','Name of Category is required').not().isEmpty(),
  body('categoryName','Name of Category is invalid').isLength({ min: 2, max: 40 }),
  (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.render('createCategory', { user:req.session.user, errs: errors.errors});
    }
    return next();
  }
];

exports.postCreateTask = [
  body('question','Question is required').not().isEmpty(),
  body('question','Question is invalid').isLength({ min: 5, max: 1000 }),
  async (req,res,next) => {
    const editCourse = await courseService.getEditCourse(req.params);
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.render('editCourse', { user:req.session.user, errs: errors.errors, course:editCourse});
    }
    return next(); 
  }
];

exports.postUploadDocument =  async (req,res,next) => {
    if(req.file === undefined || req.file.mimetype.split('/')[1]!='pdf')
    {
      const error = new Error('Document file is required or invalid');
      const editCourse = await courseService.getEditCourse(req.params);
      return res.render('editCourse', { user:req.session.user, error: error, course:editCourse });
    }
    const oldPath = req.file.path;
    const newPath = './public/documents/'+ req.file.originalname;
    const namefile = await changeNameFile(oldPath,newPath);
    req.file.path = namefile;
    return next();
}
