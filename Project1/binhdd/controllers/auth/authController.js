const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const {jwtSecret} = require('../../config/constants');
const userService = require('../../services/userService');
const traineeService = require('../../services/traineeService');
const supervisorService = require('../../services/supervisorService');
const adminService = require('../../services/adminService');

exports.login = async (req, res, next) => {
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

  const user = await userService.findUser({
  email: req.body.email
  });

  if (!user) {
    const error = new Error('Email is not exited!');
    return res.render('auth/login',{error:error, page: page, oldInfor: req.body});
  }

  const result = await bcrypt.compare(req.body.password,user.password);
  if(result === false){
    const error = new Error('Wrong password!');
    return res.render('auth/login',{error:error , page: page, oldInfor: req.body});
  }

  if(page === 2){
    if(user.userType === 'trainee') {
      const error = new Error('You do not have Supervisor account!');
      return res.render('auth/login',{error:error, page:page, oldInfor: req.body});
    }	
  }

  if(page === 3){
    if(user.userType != 'admin') {
      const error = new Error('You do not have Admin account!');
      return res.render('auth/login',{error:error, page:page, oldInfor: req.body});
    }
  }

  var payload = { email: user.email };
  var jwtToken = jwt.sign(payload, jwtSecret);
  res.cookie('token',jwtToken);
  if(user.userType === 'trainee')
    return res.redirect('/trainee');
  if(user.userType === 'supervisor')
    return res.redirect('/supervisor');
  if(user.userType === 'admin')
    return res.redirect('/supervisor');
};

exports.register = async(req,res) => {
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
  let user;
  let data = req.body;
  try{
    switch(page){
      case 1:
        user =  await userService.createUser(data);
        break;
      case 2:
        data.userType = "supervisor";
        user =  await userService.createUser(data);
        break;
      case 3:
        data.userType = "admin";
        user =  await userService.createUser(data);
        break;
    }

    
    if(user.userId === undefined){
      let error = new Error('Email is used !!!');
      return res.render('auth/register',{
        error: error,
        page: page,
        oldInfor: req.body
      });
    }		

  } catch (err){
    return res.render('auth/register',{
      errs: err,
      page: page,
      oldInfor: req.body
    });
  }
  // check type of user
  
  switch(user.userType){
    case 'supervisor':
      const supervisor = await supervisorService.createSupervisor(user);
      if(supervisor === null) return res.render('auth/register',{
        message: 'Something Wrong !!!',
        page: page,
        oldInfor: req.body
      });
      break;
    case 'admin':
      const admin = await adminService.createAdmin(user);
      if(admin === null) return res.render('auth/register',{
        message: 'Something Wrong !!!',
        page: page,
        oldInfor: req.body
      });
      break;
    default:
      const trainee = await traineeService.createTrainee(user);
      if(trainee === null) return res.render('auth/register',{
        message: 'Something Wrong !!!',
        page: page,
        oldInfor: req.body
      });
      break;
  }
  
  var payload = { email: user.email };
  var jwtToken = jwt.sign(payload, jwtSecret, { expiresIn: 60*60*60});
  res.cookie('token',jwtToken);
  if(user.userType === 'trainee')
    return res.redirect('/trainee');
  if(user.userType === 'supervisor')
    return res.redirect('/supervisor');
  if(user.userType === 'admin')
    return res.redirect('/admin');
}
 
exports.logout = (req,res) => {
  res.clearCookie('token');
  res.redirect('/');
};
