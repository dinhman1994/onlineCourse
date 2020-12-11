const moment = require('moment');

const db = require('../models/index');

const tasksOfCourse = db['TasksOfCourse'];
const enrollHistories = db['EnrollHistories'];

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

exports.getEnrollHistory = async function(req){
  try{
    const enrollHistoryData = await db.sequelize.query(`select enrollHistories.*,tasksinenroll.answer
    from tasksinenroll
    join enrollHistories on enrollHistories.enrollHistoryId = tasksinenroll.enrollHistoryId
    where taskinenrollId=${req.params.taskInEnrollId}`,{
        type: db.sequelize.QueryTypes.SELECT
    });
    return enrollHistoryData[0];
  } catch(err){
    console.log(err);
    return null;
  }
  return null;
}