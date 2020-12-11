const bcrypt = require('bcrypt');
var async = require('async');
var multer = require('multer');

const { validationResult } = require('express-validator/check');

var User = require('../models/user');
var History = require('../models/history');
var Image = require('../models/image');

var userValidator = require('../validator/userValidator');

var upload = multer({ dest: './public/images/' }).single('avatar');

exports.index = function(req,res){
	res.render('index');
}

exports.login = function(req,res){
	res.render('login');
}

exports.signup = function(req,res){
	res.render('signup');
}

exports.checkLogin = [
  //validate login form
  ...userValidator.loginValidator,

  //check login infor
  (req, res, next) => {
    const validate = validationResult(req);
    var errors = [];
    for(err of validate.array()){
      errors.push({message:err.msg});
    }

    if (errors.length!=0) {
      return next(errors);
    }

    async.waterfall([
      (callback) => {
        User.find({userName:req.body.userName})
        .populate('user')
        .exec((users,err)=>{
          callback(users,err);
        });  
      },
      (results,callback,err) => {
        if(err){
          errors.push(err);
          return next(errors);
        }
        if(results.length===0){
          var err = new Error('User not found');
          errors.push(err);
          return next(errors);
        }
        callback(null,results);
      },
      (results,callback,err) => {
        let checkPass = bcrypt.hashSync(results[0].password, bcrypt.genSaltSync(10), null);
        let user = results[0];
        bcrypt.compare(req.body.password, checkPass, (err,result)=>{
          console.log(user);
          callback(result,user)
        });
      }
      ],

      (result,user,err) => {
        if(result===false){
          err = new Error('Wrong password');
          errors.push(err);
          return next(errors);
        }

        req.session.userId = user.id;
        return next(errors);        
      }
    );
  }
];


exports.doneLogin = function(errors,req,res,next){
    console.log("Finnal step");
    if(errors.length!=0){
      res.render('login',{errors:errors});
    }
    else{
      res.redirect('/user');
    }
}


exports.loadImage = function(req,res,next){
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      next();
    } else if (err) {
      console.log(err);
      next();
    }
    next();
  });
}


exports.createUser = [
  //validate signup form
  ...userValidator.signupValidator,
  
  //check signup infor
  async(req,res,next) => {
   
    const validate = validationResult(req);
    var errors = [];
    for(err of validate.array()){
      errors.push({message:err.msg});
    }

    if(errors.length>0){
      return next(errors);
    } 
    
    let obj = req.body;
    obj.avatar = "/images/avatar.jpg";
    if(req.file){
      obj.avatar = req.file.path.split('/').slice(1).join('/');
    }
    
    let user;
    try{
      user = await User.create(obj);
    }  
    catch(err){
      err.message = 'UserName already exited';
      errors.push(err);
      return next(errors);
    }
  
    req.session.userId = user.id;
    return next(errors);
  }
]


exports.doneSignup = function(errors,req,res,next){
  console.log("Finnal step signup");
  if(errors.length>0){
    res.render('signup',{errors:errors});
  }
  else{
    res.redirect('/user');
  }
}


exports.checkUser = async(req,res) => {
  var results = await User.find({}).populate('user').exec();
  console.log(results);   
  res.render('index');  
}

