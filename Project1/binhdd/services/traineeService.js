const bcrypt = require('bcrypt');
const moment = require('moment');

const db = require('../models/index');

const courseService = require('./courseService');

const trainees = db['Trainees'];
const courses = db['Courses'];
const enrollHistories = db['EnrollHistories'];
const categoriesOfCourse = db['CategoriesOfCourse'];
const categories = db['Categories'];
const tasksInEnroll = db['TasksInEnroll'];



exports.createTrainee = async function(data){
  try{
	const newTrainee = await trainees.create({
	  statusBlock: false,
	  createdAt: moment(),
	  updatedAt: moment(),
	  userId: data.get('userId')
	});
	return newTrainee;
  }
  catch(err){
	console.log(err);
	return null;
  }
  return null;
}

 exports.findTrainee = async function(data){
  try{
	const trainee = await trainees.findOne({ where: { userId: data.userId } });
	console.log("???");
	if(trainee === null)
	{
	  console.log("you are anonymous");
	  return null;
	}
	return trainee;
  	} catch(err){
	console.log(err);
	return null;
  	}
 	return null;
}

exports.registerCourse = async function(data){
	const courseId = data.params.courseId;
	const courseData = await courses.findOne({ where: {courseId: courseId} });
	const traineeData = await trainees.findOne({ where: {userId: data.session.user.userId} });
	if (courseData.dataValues.typeOfCourse==='free' && traineeData.dataValues.statusBlock===false){
		const newEnrollHistory = await enrollHistories.create({
			process: parseFloat(0),
			startDay: moment(),
			endDay: moment().add(courseData.dataValues.timeOfCourse,'days'),
			statusEnroll: false,
			createdAt: moment(),
			updatedAt: moment(),
			courseId: courseId,
			traineeId: traineeData.dataValues.traineeId
		});
		return newEnrollHistory;
	}
	return null;
}

exports.getYourCourses = async function(data){
	let Courses = [];
	const enrollData = await enrollHistories.findAll({ where: {traineeId: data.session.trainee.traineeId} });
	for (const data of enrollData){
		const courseData = await courses.findOne({ where: {courseId:data.dataValues.courseId} });
		const resultCourse = {...courseData.dataValues};
		resultCourse.categories = [];
			const categoriesOfCourseData = await categoriesOfCourse.findAll({ where:{ courseId:courseData.dataValues.courseId } });
			for(const categoryOfCourseData of categoriesOfCourseData){
				const categoryData = await categories.findOne({ where:{categoryId: categoryOfCourseData.dataValues.categoryId} });
				resultCourse.categories.push(categoryData.dataValues.categoryName);
			}
			// push course into Courses array
		Courses.push(resultCourse);
	}
	return Courses;
}

exports.getTraineesInCourse = async function(data){
	const traineesData = await db.sequelize.query(`select
	users.userId,users.name,trainees.traineeId
	from users
	join trainees on trainees.userId = users.userId
	join enrollhistories on enrollhistories.traineeId = trainees.traineeId
	where enrollhistories.courseId = ${data.courseId}`,{
		type: db.sequelize.QueryTypes.SELECT
	});
	return traineesData;
}

exports.postAnswer = async function(data){
	const enrollHistoriesData = await db.sequelize.query(`select *
	from enrollhistories
    join trainees on enrollhistories.traineeId = trainees.traineeId
	join users on trainees.userId = users.userId
    join courses on enrollhistories.courseId = courses.courseId
	where enrollhistories.courseId = ${data.params.courseId} And users.userId = ${data.session.user.userId}`,{
		type: db.sequelize.QueryTypes.SELECT
	});

	try{
		const newTaskInEnroll = await tasksInEnroll.create({
			status: false,
			createdAt: moment(),
			updatedAt: moment(),
			taskId: data.params.taskId,
			enrollHistoryId: enrollHistoriesData[0].enrollHistoryId,
			answer: data.body.answer
		});
		return newTaskInEnroll;
	} catch (err){
		console.log(err);
		return null;
	}
	return null;
}

exports.getTraineeCourse = async function(data){
	let traineeCourse={};
	const courseData = await courseService.getEditCourse(data.params);
	traineeCourse = { ...courseData};
	const answeredTasksData = await db.sequelize.query(`select tasksinenroll.*,tasksofcourse.taskId,tasksofcourse.question
	from tasksinenroll
    join tasksofcourse on tasksofcourse.taskId = tasksinenroll.taskId
    join enrollhistories on enrollhistories.enrollhistoryId = tasksinenroll.enrollhistoryId
	join trainees on trainees.traineeId = enrollhistories.traineeId
    join users on users.userId = trainees.userId
    join courses on courses.courseId = enrollhistories.courseId
	where courses.courseId = ${data.params.courseId} And users.userId = ${data.session.user.userId}`,{
		type: db.sequelize.QueryTypes.SELECT
	});
	traineeCourse.answeredTasks = [];
	for( answeredTaskData of answeredTasksData){
		traineeCourse.answeredTasks.push({...answeredTaskData});
		traineeCourse.tasksOfCourse = traineeCourse.tasksOfCourse.filter((task) => {
			return task.taskId != answeredTaskData.taskId
		});
	}
	return traineeCourse;
}

exports.seeAnswers = async function(data){
	const traineeAnswers = await db.sequelize.query(`select tasksinenroll.*,tasksofcourse.taskId,tasksofcourse.question,users.name
	from tasksinenroll
    join tasksofcourse on tasksofcourse.taskId = tasksinenroll.taskId
    join enrollhistories on enrollhistories.enrollhistoryId = tasksinenroll.enrollhistoryId
	join trainees on trainees.traineeId = enrollhistories.traineeId
	join users on users.userId = trainees.userId
    join courses on courses.courseId = enrollhistories.courseId
	where courses.courseId = ${data.params.courseId} And trainees.traineeId = ${data.params.traineeId}`,{
		type: db.sequelize.QueryTypes.SELECT
	});
	return traineeAnswers;
}