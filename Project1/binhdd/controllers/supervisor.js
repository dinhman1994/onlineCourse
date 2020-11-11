const jwt = require('jsonwebtoken');

const {jwtSecret} = require('../config/constants');

const userService = require('../services/userService');
const courseService = require('../services/courseService');
const categoryService = require('../services/categoryService');
const supervisorService = require('../services/supervisorService');
const taskService = require('../services/taskService');
const documentService = require('../services/documentService');
const traineeService = require('../services/traineeService');

module.exports.supervisor = async function(req,res) {
	if(!req.session.user){
		return res.redirect('/');
	}
	const supervisorCoursesData = await supervisorService.getSupervisorCourses(req.session.user);
	res.render('supervisor',{ user:req.session.user, courses: supervisorCoursesData });
}

module.exports.createCourse = async function(req,res) {
	if(!req.session.user){
		return res.redirect('/');
	}
	if(!req.session.categories)
	{
		req.session.categories = await categoryService.getCatagories();
	}
	res.render('createCourse',{ user:req.session.user, categories:req.session.categories });
}

module.exports.profile = async function(req,res) {
	if(!req.session.user){
		return res.redirect('/');
	}
	res.render('supervisorProfile',{ user:req.session.user });
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
		return res.render('supervisorProfile',{user:req.session.user,message: result.message});
	}
	var payload = { email: req.body.email };
	var jwtToken = jwt.sign(payload, jwtSecret);
	res.cookie('token',jwtToken);
	return res.redirect('/supervisor/profile');
}


module.exports.createNewCourse = async function(req,res){
	try{
		const newCourse = await courseService.createCourse(req.body,req.session.user);	
	} catch (err)
	{
		return res.render('createCourse',{err : err,user:req.session.user, categories:req.session.categories});
	}
	return res.render('createCourse',{message : "Success to create New Course",user:req.session.user, categories:req.session.categories});
}

module.exports.seeCourse = async function(req,res){
	const editCourse = await courseService.getEditCourse(req.params);
	return res.render('editCourse',{user:req.session.user, course:editCourse});
}

module.exports.createTask = async function(req,res){
	const newTask = await taskService.createTask(req.body,req.params);
	return res.redirect(`/supervisor/course/${req.params.courseId}`);
}

module.exports.uploadDocument = async function(req,res){
	const newDocument = await documentService.createDocument(req,req.params);
	return res.redirect(`/supervisor/course/${req.params.courseId}`);
}

module.exports.seeTrainees = async function(req,res){
	const traineesInCourse = await traineeService.getTraineesInCourse(req.params);
	return res.json({traineesInCourse});
}