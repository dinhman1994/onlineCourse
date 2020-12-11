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
	const categories = await categoryService.getCatagories();
	try{
		const newCourse = await courseService.createCourse(req.body,req.session.user);	
	} catch (err)
	{
		return res.render('createCourse',{err : err,user:req.session.user, categories:categories});
	}
	return res.render('createCourse',{message : "Success to create New Course",user:req.session.user, categories:categories});
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
	const searchedTrainees = await traineeService.getSearchedTrainees(req);
	const editCourse = await courseService.getEditCourse(req.params);
	return res.render('seeTrainees',
	{user:req.session.user, 
		course:editCourse, 
		trainees: traineesInCourse,
		searchedTrainees: searchedTrainees 
	});
}

module.exports.seeTrainee = async function(req,res){
	const traineeData = await traineeService.getTraineeInfor(req);
	const trainee = traineeData[0];
	trainee.birthday = trainee.birthday.toLocaleString().split(',')[0];
	return res.render('supervisorSeeTrainee',{user:req.session.user, trainee:trainee});
}

module.exports.seeAnswers = async function(req,res){
	const traineeAnswers = await traineeService.seeAnswers(req);
	const traineeData = await traineeService.getTraineeInfor(req);
	const trainee = traineeData[0];
	return res.render('seeAnswers',{user:req.session.user, answers: traineeAnswers, trainee: trainee});
}

module.exports.checkAnswer = async function(req,res){
	const traineeAnswer = await supervisorService.checkAnswer(req);
	const data = await taskService.getEnrollHistory(req);
	return res.redirect(`/supervisor/seeAnswers/${data.courseId}/${data.traineeId}`);
}

module.exports.seeSupervisors = async function(req,res){
	const editCourse = await courseService.getEditCourse(req.params);
	const searchedSupervisors = await supervisorService.getSupervisors(req);
	const supervisorsInCourse = await supervisorService.supervisorsInCourse(req);
	return res.render('seeSupervisors',{
		user:req.session.user,course: editCourse,
		searchedSupervisors: searchedSupervisors, 
		supervisorsInCourse:supervisorsInCourse});
}

module.exports.addTrainee = async function(req,res){
	const newEnrollHistories = await supervisorService.addTrainee(req);
	return res.redirect(`/supervisor/course/${req.params.courseId}/trainees`);
}

module.exports.seeSupervisor = async function(req,res){
	const traineeData = await supervisorService.getSupervisorInfor(req);
	const trainee = traineeData[0];
	trainee.birthday = trainee.birthday.toLocaleString().split(',')[0];
	return res.render('supervisorSeeTrainee',{user:req.session.user, trainee:trainee});
}

module.exports.addSupervisor = async function(req,res){
	const newSupervisorCourse = await supervisorService.addSupervisorCourse(req);
	return res.redirect(`/supervisor/course/${req.params.courseId}/addSupervisor`);
}

module.exports.category = async function(req,res){
	const categories = await categoryService.getCatagories();
	res.render('createCategory',{ user:req.session.user, categories: categories });
}

module.exports.createCategory = async function(req,res){
	const newCategory = await categoryService.createCategory(req.body);
	const categories = await categoryService.getCatagories();
	if(newCategory === null)
		return res.render('createCategory',{ user:req.session.user, message: 'Something Wrong !',categories: categories });
	return res.render('createCategory',{ user:req.session.user, message: 'Success create New Category !',categories: categories});
}

module.exports.makePublicCourse = async function(req,res){
	const upDateCourse = await courseService.makePublicCourse(req);
	return res.redirect(`/supervisor`);
}