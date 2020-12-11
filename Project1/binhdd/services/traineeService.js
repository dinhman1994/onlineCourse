const bcrypt = require('bcrypt');
const moment = require('moment');
const { trainee } = require('../controllers/trainee');

const db = require('../models/index');
const {Op} = require('sequelize');

const courseService = require('./courseService');

const trainees = db['Trainees'];
const courses = db['Courses'];
const enrollHistories = db['EnrollHistories'];
const reportHistories = db['ReportHistories'];
const categoriesOfCourse = db['CategoriesOfCourse'];
const categories = db['Categories'];
const tasksInEnroll = db['TasksInEnroll'];
const tasksOfCourse = db['TasksOfCourse'];


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

exports.getTraineeInfor = async function(data){
	try{
		const traineeInfor = await db.sequelize.query(`select * from 
		trainees
		join users on trainees.userId = users.userId
		where trainees.traineeId = ${data.params.traineeId}`,{
			type: db.sequelize.QueryTypes.SELECT
		});
		return traineeInfor;
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
	if (traineeData.dataValues.statusBlock===false){
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
		resultCourse.process = parseInt(data.dataValues.process*100);
		resultCourse.statusEnroll = data.dataValues.statusEnroll;
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
	users.userId,users.name,users.email,trainees.traineeId
	from users
	join trainees on trainees.userId = users.userId
	join enrollhistories on enrollhistories.traineeId = trainees.traineeId
	where enrollhistories.courseId = ${data.courseId} and trainees.deletedAt is null`,{
		type: db.sequelize.QueryTypes.SELECT
	});
	return traineesData;
}

exports.getSearchedTrainees = async function(req){
	if(req.query.email === undefined)
		return [];
	let searchedTrainees = await db.sequelize.query(`select * from 
	trainees
	join users on trainees.userId = users.userId
	where users.email like '%${req.query.email}%' and trainees.deletedAt is null`,{
		type: db.sequelize.QueryTypes.SELECT
	});

	const traineesData = await this.getTraineesInCourse(req.params);

	for(traineeData of traineesData){
		searchedTrainees = searchedTrainees.filter((searchedTrainee) => {
			return searchedTrainee.traineeId != traineeData.traineeId
		});
	}

	return searchedTrainees;

}

exports.getSearchedTraineesNotBlock = async function(req){ 
	if(req.query.email === undefined)
		return [];
	let searchedTrainees = await db.sequelize.query(`select * from 
	trainees
	join users on trainees.userId = users.userId
	where users.email like '%${req.query.email}%' and trainees.statusBlock = false and trainees.deletedAt is null`,{
		type: db.sequelize.QueryTypes.SELECT
	});	
	return searchedTrainees;
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

		const numOfTasksInEnrollData = await tasksInEnroll.findAll({
			where: {
				enrollHistoryId: enrollHistoriesData[0].enrollHistoryId
			}
		});

		let numOfTasksInEnroll = 0;
		for(numOfTaskInEnrollData of numOfTasksInEnrollData){
			numOfTasksInEnroll++;
		}

		const numOfTasksOfCourseData = await tasksOfCourse.findAll({
			where: {
				courseId: enrollHistoriesData[0].courseId
			}
		});

		let numOfTaskOfCourse = 0;
		for(numOfTaskOfCourseData of numOfTasksOfCourseData){
			numOfTaskOfCourse++;
		}

		const process = parseFloat(numOfTasksInEnroll/numOfTaskOfCourse);

		const updateEnrollHistoriesData = await enrollHistories.update(
			{
				process: process,
				statusEnroll: (numOfTasksInEnroll === numOfTaskOfCourse)
			},
			{returning: true, where: {enrollHistoryId: enrollHistoriesData[0].enrollHistoryId}}
		 );
		 newTaskInEnroll.courseId = enrollHistoriesData[0].courseId;
		
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
	const enrollHistoryData = await enrollHistories.findOne({
		where: {
			courseId: courseData.courseId
		}
	});
	traineeCourse = { ...courseData,
		 ...enrollHistoryData.dataValues,
		 process: parseInt(enrollHistoryData.dataValues.process * 100)
		};
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
	const report = await this.checkReport(data);
	traineeCourse.report = {...report};
	return traineeCourse;
}

exports.seeAnswers = async function(data){
	try{
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
	} catch(err){
		console.log(err);
		return [];
	}
	return [];
	
}

exports.answerAgain = async function(req){
	try{
		const traineeAnswer = await tasksInEnroll.update(
			{
				answer: req.body.answer,
				result: null,
				status: false
			},
			{returning: true, where: {taskInEnrollId: req.params.taskInEnrollId}}
		 );
		 return traineeAnswer;
	} catch (err){
		console.log(err);
		return null;
	}
	return null;
}

exports.checkReport = async function(req){
	let startDay = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'); 
	let endDay = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'); 
	const reportData = await db.sequelize.query(`select * from reporthistories 
	where
		courseId = ${req.params.courseId} 
		and traineeId = ${req.session.trainee.traineeId}
		and createdAt > '${startDay}'
		and createdAt < '${endDay}'`,{
			type: db.sequelize.QueryTypes.SELECT
	});
	let report = {};
	report.isReported = true;
	if (reportData.length === 0) report.isReported = false;
	if (reportData.length === 1) report.reportContent = reportData[0].reportContent;
	return report;
}

exports.makeReport = async function(req){
	try{
		const newReport = await reportHistories.create({
			...req.body,
			createdAt: moment(),
			updatedAt: moment(),
			timeWrite: moment(),
			courseId: req.params.courseId,
			traineeId: req.session.trainee.traineeId
		});
		return newReport;
	} catch (err){
		console.log(err);
		return null;
	}
	
}

exports.getTraineesIsBlocked = async function(){
	try{
		const traineesIsBlocked = await db.sequelize.query(`select * from 
		trainees
		join users on trainees.userId = users.userId
		where trainees.statusBlock = true and trainees.deletedAt is null`,{
			type: db.sequelize.QueryTypes.SELECT
		});
		return traineesIsBlocked;
	} catch (err){
		console.log(err);
		return null;
	}
}

exports.deleteTrainee = async function(req){
	const deletedTrainee = await trainees.update(
		{
			deletedAt : moment()
		},
		{
			where:{
				traineeId: req.params.traineeId
			}
		}
	);
	return deletedTrainee;
}

exports.unblockTrainee = async function(req){
	const unblockedTrainee = await trainees.update(
		{
			statusBlock: false
		},
		{
			where:{
				traineeId: req.params.traineeId
			}
		}
	);
	return unblockedTrainee;
}

exports.checkTraineeFail = async function(){
	let thisMoment = moment().format('YYYY-MM-DD HH:mm:ss');
	const checkListFail = await db.sequelize.query(`select * from enrollhistories 
		left join trainees
		on enrollhistories.traineeId = trainees.traineeId
		where enrollhistories.endDay < '${thisMoment}' 
		and not enrollhistories.process = 1
		and statusEnroll = false`,{
		type: db.sequelize.QueryTypes.SELECT
	});
	let setFailEnrollHistory = await Promise.all(
		checkListFail.map(
			async(item) => {
				await enrollHistories.update(
					{
						statusEnroll: true
					},
					{
						where: {
							enrollHistoryId: item.enrollHistoryId
						}
					}
				);
			}
		)
	);
	let increaseTimeOfFail = await Promise.all(
		checkListFail.map(async(item) => {
			return await trainees.increment(
				['timeOfFail'],
				{
					by:1,
					where: {
						traineeId: item.traineeId,
						timeOfFail:{
							[Op.lt]: 3
						}
					}
				}
			);
		}
		)
	);
	let checkBlockTrainee = await trainees.update(
		{
			statusBlock: true
		},
		{
			returning: true,
			where: {
				timeOfFail: {
					[Op.eq]: 3
				}
			}
		}
	); 
}

