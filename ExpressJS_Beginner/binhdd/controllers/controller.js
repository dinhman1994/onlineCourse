const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const bcrypt = require('bcrypt');
var async = require('async');

var User = require('../models/user');
var History = require('../models/history');
var Image = require('../models/image');

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

exports.userCreateDB = function(req,res,next) {
    // async.series([
    //     function(callback) {
    //       userCreate('Tung', 25, '1993-03-15', 'Tungbg95', '25251325ce0',callback);
    //     }],
    //     // optional callback
    //     (err, results)=>{
    //       if (err) {
    //           console.log('FINAL ERR: '+err);
    //           next();
    //       }
    //       else {
    //           console.log('Users: '+users);
    //           next();
    //       }
    //       // All done, disconnect from database
    //       next();
    //     });

    // obj = {name: 'Tung', age: 25, date_of_birth: '1993-03-15', userName: 'Tungbg95', password: '25251325ce0' };
    // User.create(obj, function (err, small) {
    //   if (err) return handleError(err);
    //   // saved!
      next();
    // });
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
  console.log(res.locals.test);
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

        // Extract the validation errors from a request .
        const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data (and the old id!)
     

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            console.log('Invalid Value');
            res.render('login', { title: 'Update Login', errors: errors.array()});
        return;
        }
        else {
            // Data from form is valid. Update the record.
           	
        User.find({userName:req.body.userName})
		    .populate('user')
        .exec(function (err, results) {
		      if (err) {return next(err)} 
		      else {
                if(results.length===0)
                {
                    var err = new Error('User not found');
                    err.status =401;
                    next(err);
                }
                else{
                    let checkPass = bcrypt.hashSync(results[0].password, bcrypt.genSaltSync(10), null);
                    console.log(checkPass);
                    bcrypt.compare(req.body.password, checkPass , function (err, result) {
                        if(result===false){
                            err = new Error('Wrong password');
                            next(err);
                        }
                        else{
                            req.session.userId = results[0].id;
                            err = new Error();
                            next(err);
                        }
                    });       
                }
              }
            });
		    	// if(results.length===0){
		    	// 	console.log("UNIQUE");
       //              console.log(req.body.password);
       //              var createHash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null);
       //              console.log(createHash);
       //              var err = new Error('User not found');
       //              err.status =401;
       //              next(err);
		    	// }
       //          else{
       //              bcrypt.compare(password, user.password, function (err, result) {
       //                  if (result === true) {
       //                    next(null, user);
       //                  } else {
       //                    next();
       //                  }
       //              });                        
       //          } 
		     //  }; 
            // console.log(results);
            // var err = new Error();
            // next(err);
		    
		}
    }
];

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

exports.createUser = [
  body('userName', 'UserName name required at least 2 characters').isLength({ min: 2 }).trim(),
  body('password', 'Password required at least 6 characters').isLength({ min: 6 }).trim(),
  body('name', 'Name required at least 2 characters').isLength({ min: 2 }).trim(),
  (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      console.log(errors.array());
      next(errors.array());
    }
    let obj = req.body;
    obj.avatar = req.file.path.split('/').slice(1).join('/');
    User.create(obj, function (err, user) {
      if (err) {
        console.log("Error");
        console.log(err);
        res.locals.test = "test";
        var err = new Pcss;
        next(err);
      }
      else{
        console.log(user);
        req.session.userId = user.id;
        var err = new Error();
        next(err);
      }
    });     
  } 
]


exports.doneSignup = function(err,req,res,next){
  console.log("Finnal step signup");
  if(err.message!=""){
    console.log(err.message);
    let errors = err.array();
    res.render('signup',{errors: err.array()});
  }
  else{
    res.redirect('/user');
  }
}

exports.doneLogin = function(err,req,res,next){
    console.log("Finnal step");
    if(err.message!=""){
        res.redirect('/login');
    }
    else {
        res.redirect('/user');
    }
}

exports.listUsers = function(req,res) {

  User.find({})
    .populate('user')
    .exec(function (err, list_users) {
      console.log('Ok');
      if (err) {
        res.redirect('/');
      } 
      else {
        console.log(list_users);
        res.redirect('/');      
      }
    });
}


exports.checkSession = function(req,res,next){
  if(req.session.userId===""){
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