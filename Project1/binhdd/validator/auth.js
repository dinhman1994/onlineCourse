const { body, validationResult } = require('express-validator');

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
      return res.render('auth/login', { errs: errors.errors, page:page, oldInfor: req.body});
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
      return res.render('auth/register', { errs: errors.errors,page: page,oldInfor: req.body });
    }

    if(req.body.password != req.body.retype_password){
      const error = new Error('You must type password and retype_password the same !');
      return res.render('auth/register', { error:error, page: page,oldInfor: req.body });
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

