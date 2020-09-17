const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const bcrypt = require('bcrypt');
var async = require('async');
var multer = require('multer');


var User = require('../models/user');
var History = require('../models/history');
var Image = require('../models/image');

var upload = multer({ dest: './public/images/' }).single('avatar');

function userCreate(name, age, date_of_birth, userName, password,avatar,cb) {
  userdetail = {name:name , age: age , userName: userName, password: password };
  if (date_of_birth != false) userdetail.date_of_birth = date_of_birth;
  
  
  var user = new User(userdetail);
       
  user.save(function (err) {
    if (err) {
      cb(err, null)
      return
    };
    console.log('New User: ' + user);
    users.push(user);
    cb(null, user);
  });
}

exports.index = function(req,res){
	res.render('index');
}

exports.login = function(req,res){
	res.render('login');
}

exports.signup = function(req,res){
	res.render('signup');
}

exports.userHome = function(req,res){
	res.render('user',{ user: res.locals.user });
}

exports.history = function(req,res){
	res.render('history');
}

exports.showImage = function(req,res){
	res.render('image');
}

exports.getProfile = function(req,res){
	res.render('profile',{ user: res.locals.user, date: res.locals.date_of_birth});
}


exports.checkLogin = [
   
  // Validate that the name field is not empty.
  body('userName', 'userName name required').isLength({ min: 1 }).trim(),
  body('password', 'password name required').isLength({ min: 1 }).trim(), 
  // Sanitize (escape) the name field.
  sanitizeBody('email').escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    const validate = validationResult(req);
    var errors = [];
    for(err of validate.array()){
      errors.push({message:err.msg});
    }
    if (errors.length!=0) {
    // There are errors. Render the form again with sanitized values and error messages.
      next(errors);
      return;
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
          next(errors);
          return;
        }
        if(results.length===0){
          var err = new Error('User not found');
          errors.push(err);
          next(errors);
          return;
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
            next(errors);
        }
        else{
            req.session.userId = user.id;
            next(errors);
        }        
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



exports.postLogout = function(req,res){
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log('Deleted');
    }
  });
  res.redirect('/');
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
  body('userName', 'UserName name required at least 2 characters').isLength({ min: 2 }).trim(),
  body('password', 'Password required at least 6 characters').isLength({ min: 6 }).trim(),
  body('name', 'Name required at least 2 characters').isLength({ min: 2 }).trim(),
  body('date_of_birth', 'Date_of_birth is required').isLength({ min: 2 }).trim(),
  (req,res,next) => {
   
    const validate = validationResult(req);
    var errors = [];
    for(err of validate.array()){
      errors.push({message:err.msg});
    }

    if(errors.length>0){
      next(errors);
      return;
    } 
    else{
        let obj = req.body;
        if(req.file){
          obj.avatar = req.file.path.split('/').slice(1).join('/');
        }
        else{
          obj.avatar = "/images/avatar.jpg";
        }
      
        User.create(obj, function (err, user) {
          if (err) {
            err.message = 'UserName already exited';
            errors.push(err);
            next(errors);
          }
          else{
            console.log(user);
            req.session.userId = user.id;
            next(errors);
          }
        }); 
    } 
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



exports.listUsers = async function(req,res) {

  var results= await User.find({}).populate('user').exec();
  console.log(results);
  res.render('index');
}


exports.checkSession = function(req,res,next){
  if(!req.session.userId){
    res.redirect('/');
  }
  else{
    next();
  }
}

exports.getUser = function(req,res,next){
  var userId = req.session.userId;
  User.find({_id: userId})
  .populate('user')
  .exec(function (err, results) {
    if (err) {return next(err)} 
    else {
          if(results.length===0)
          {
              var err = new Error('User not found');
              err.status =401;
              res.redirect('/');
          }
          else{  
                res.locals.user = results[0];
                let date_of_birth = results[0].date_of_birth.toLocaleString().split(',')[0];
                res.locals.date_of_birth = {date_of_birth:date_of_birth};
                // res.locals.date_of_birth = date_of_birth;
                // res.locals.user.date_of_birth = res.locals.date_of_birth.toLocaleFormat('%A, %B %e, %Y');
                next();              
          }
    }
  });
}

exports.checser = async function(req,res){
  var results = await User.find({fsafasfa : '1111'}).populate('user').exec();
  console.log(results);
  res.render('index');  
}

exports.checkUser = async function(req,res){
  var user = await User.create({name: 'Binhbg14', age: 25, date_of_birth: '1993-03-15', userName: 'Binhbg14', password: '25251325ce0' });
}


exports.checUser = async function(req,res){
  await User.deleteMany();
  res.render('index');
}