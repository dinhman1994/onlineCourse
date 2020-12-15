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
	const [categoriesInCourse,coursesData] = await Promise.all([
												 categoryService.getCatagories(),
												 courseService.getCourses(req)			
											]);
	res.render('trainee',
	{ user:req.session.user, 
		courses: coursesData, 
		categories:categoriesInCourse
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
	const traineeCourse = await traineeService.getTraineeCourse(req);
	return res.render('seeCourse',{user: req.session.user, course: traineeCourse});
}

module.exports.answerTask = async function(req,res){
	const traineeAnswer = await traineeService.postAnswer(req);
	res.redirect(`/trainee/yourCourses/${traineeAnswer.courseId}`);
}

module.exports.seeTrainees = async function(req,res){
	const [traineesInCourse,editCourse] = await Promise.all([
											traineeService.getTraineesInCourse(req.params),
											courseService.getEditCourse(req.params)
											]);
	return res.render('traineeSeeTrainees',{user:req.session.user, course:editCourse, trainees: traineesInCourse});
}

module.exports.seeTrainee = async function(req,res){
	const traineeData = await traineeService.getTraineeInfor(req);
	const trainee = traineeData[0];
	trainee.birthday = trainee.birthday.toLocaleString().split(',')[0];
	return res.render('traineeSeeTrainee',{user:req.session.user, trainee:trainee});
}

module.exports.answerAgain = async function(req,res){
	const traineeAnswer = await traineeService.answerAgain(req);
	const courseFromTaskInEnroll = await courseService.getCourseFromTaskInEnroll(req);
	return res.redirect(`/trainee/yourCourses/${courseFromTaskInEnroll.courseId}`);
}

module.exports.makeReport = async function(req,res){
	const newReport = await traineeService.makeReport(req);
	return res.redirect(`/trainee/yourCourses/${req.params.courseId}`);
}

module.exports.seeSearchTrainee = async function(req,res){
	const trainees = await traineeService.getSearchedTrainees(req);
	return res.render('traineeSearch',{user:req.session.user, trainees:trainees});
}