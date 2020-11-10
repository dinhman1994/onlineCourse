const moment = require('moment');

const db = require('../models/index');

const tasksOfCourse = db['TasksOfCourse'];

exports.createTask = async function(data,courseData){
  try{
	const newTask = await tasksOfCourse.create({
      ...data,
      courseId: courseData.courseId,
	  createdAt: moment(),
	  updatedAt: moment()
	});
	return newTask;
  }
  catch(err){
	console.log(err);
	return null;
  }
  return null;
}
