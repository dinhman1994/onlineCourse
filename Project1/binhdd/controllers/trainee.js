const jwt = require('jsonwebtoken');

const {jwtSecret} = require('../config/constants');
const userService = require('../services/userService');
const traineeService = require('../services/traineeService');
const courseService = require('../services/courseService');
const categoryService = require('../services/categoryService');

module.exports.trainee = async function(req,res) {
	if(!req.session.user){
		return res.redirect('/');
	}
	if(!req.session.categories)
	{
		req.session.categories = await categoryService.getCatagories();
	}
	const coursesData = await courseService.getCourses(req.query);
	res.render('trainee',
	{ user:req.session.user, 
		courses: coursesData, 
		categories:req.session.categories
	});
}

module.exports.yourCourses = async function(req,res) {
	if(!req.session.user){
		return res.redirect('/');
	}
	const yourCourses = await traineeService.getYourCourses(req);
	res.render('yourCourses',{ user:req.session.user, courses: yourCourses });
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

module.exports.registerCourse = async function(req,res){
	newRegisterCourse = await traineeService.registerCourse(req);
	if (newRegisterCourse!= null){
		return res.redirect('/trainee/yourCourses');
	}
	return res.redirect('/trainee');
}

module.exports.seeCourse = async function(req,res){
	const traineeCourse = await traineeService.seeCourse(req.params);
	return res.render('seeCourse',{user: req.session.user});
}