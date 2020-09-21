const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const bcrypt = require('bcrypt');
var async = require('async');
var multer = require('multer');

var User = require('../models/user');
var History = require('../models/history');
var Image = require('../models/image');

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

exports.listUsers = async(req,res) => {

  var results= await User.find({}).populate('user').exec();
  console.log(results);
  res.render('index');
}

exports.getUser = async(req,res,next) => {
  var userId = req.session.userId;
  let user;
  try{
    user = await User.findOne({_id: userId}).populate('user').exec(); 
  }
  catch(err){
    return next(err);
  }

  res.locals.user = user;
  let date_of_birth = user.date_of_birth.toLocaleString().split(',')[0];
  res.locals.date_of_birth = {date_of_birth:date_of_birth};
  next(); 
}







                  