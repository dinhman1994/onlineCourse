const bcrypt = require('bcrypt');
const moment = require('moment');

const db = require('../models/index');

const { saltRounds } = require('../config/constants');
const { doubleclickbidmanager } = require('googleapis/build/src/apis/doubleclickbidmanager');

const trainees = db['Trainees'];
const courses = db['Courses'];
const enrollHistories = db['EnrollHistories'];
const categoriesOfCourse = db['CategoriesOfCourse'];
const categories = db['Categories'];


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

exports.seeCourse = async function(data){
	let Course;
	const courseData = await courses.findOne({ where: { courseId: data.courseId} });
	
	return Course;
}

exports.getTraineesInCourse = async function(data){
	let Trainees = [];
	cars = await db.sequelize.query(`select
	users.userId,users.name
	from users
	join trainees on trainees.userId = users.userId
	join enrollhistories on enrollhistories.traineeId = trainees.traineeId
	where enrollhistories.courseId = ${data.courseId}`,{
		type: db.sequelize.QueryTypes.SELECT
	});
	return cars;
}