const jwt = require('jsonwebtoken');

const userService = require('../services/userService');
const {jwtSecret} = require('../config/constants');

module.exports.trainee = async function(req,res) {
	if(!req.session.user){
		return res.redirect('/');
	}
	res.render('trainee',{ user:req.session.user });
}

module.exports.yourCourses = async function(req,res) {
	if(!req.session.user){
		return res.redirect('/');
	}
	res.render('yourCourses',{ user:req.session.user });
}

module.exports.profile = async function(req,res) {
	if(!req.session.user){
		return res.redirect('/');
	}
	res.render('profile',{ user:req.session.user });
}

module.exports.updateProfile = async function(req,res){
	if(!req.session.user){
		return res.redirect('/');
	}
	result = await userService.updateProfile(req.body,req.session.user);
	if(result === null){
		return res.render('profile',{ user:req.session.user});	
	}
	if(result.message)
	{
		return res.render('profile',{user:req.session.user,message: result.message});
	}
	var payload = { email: req.body.email };
	var jwtToken = jwt.sign(payload, jwtSecret);
	res.cookie('token',jwtToken);
	res.redirect('/trainee/profile');
}