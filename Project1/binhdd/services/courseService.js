const moment = require('moment');

const db = require('../models/index');

const { saltRounds } = require('../config/constants');
const { supervisor } = require('../controllers/supervisor');

const courses = db['Courses'];
const categoriesOfCourse = db['CategoriesOfCourse'];
const categories = db['Categories'];
const supervisorCourses = db['SupervisorCourses'];
const supervisors = db['Supervisors'];
const tasksOfCourse = db['TasksOfCourse'];
const documents = db['Documents'];
const reportHistories = db['ReportHistories'];

exports.createCourse = async function(data,user){
  try{
	const newCourse = await courses.create({
	  ...data,
	  createdAt: moment(),
	  updatedAt: moment()
	});

	if(typeof data.categoryName === "string"){
		const category = await categories.findOne({ where:{categoryName: data.categoryName} });
		const newCategoriesOfCourse = await categoriesOfCourse.create(
			{
				createdAt: moment(),
	  			updatedAt: moment(),
	  			courseId: newCourse.dataValues.courseId,
	  			categoryId: category.dataValues.categoryId
			}
		);
		console.log(newCategoriesOfCourse);	
	}
	if(typeof data.categoryName === 'object'){
		// Need something here
		for(const categoryNameItem of data.categoryName){
			const category = await categories.findOne({ where:{categoryName: categoryNameItem} });
			const newCategoriesOfCourse = await categoriesOfCourse.create(
				{
					createdAt: moment(),
					updatedAt: moment(),
					courseId: newCourse.dataValues.courseId,
					categoryId: category.dataValues.categoryId
				}
			);
			console.log('Done');
		}
	}
	const supervisor = await supervisors.findOne({
		where: {
			userId: user.userId
		}
	});
	const newSupervisorCourses = await supervisorCourses.create({
		courseId: newCourse.dataValues.courseId,
		supervisorId: supervisor.dataValues.supervisorId,
		createdAt: moment(),
		updatedAt: moment()
	});


	return newCourse;
  }
  catch(err){
	console.log(err);
	return null;
  }
  return null;
}

exports.getCourses = async function(req){
	let Courses = [];
	let coursesData = await db.sequelize.query(`Select courses.* from
		courses
		left outer join enrollhistories
		on courses.courseId = enrollhistories.courseId and enrollhistories.traineeId = ${req.session.trainee.traineeId}
		where  enrollhistories.enrollhistoryId is null`,{
			type: db.sequelize.QueryTypes.SELECT
		}
	);

	if(typeof req.query.category === "string"){
		const categoryData = await categories.findOne({ where: { categoryName: req.query.category } });
		const categoryId = categoryData.dataValues.categoryId;
		const categoriesOfCourseData = await categoriesOfCourse.findAll({
			where: {
				categoryId: categoryId
			}
		});
	
		for (courseData of coursesData){
			const index = categoriesOfCourseData.indexOf(categoriesOfCourseData.find((categoryOfCourseData) => categoryOfCourseData.dataValues.courseId === courseData.courseId));
			if(index === -1) {
				const deleteIndex = coursesData.indexOf(courseData);
				coursesData = [...coursesData.slice(0,deleteIndex),...coursesData.slice(deleteIndex+1,coursesData.length)]; 
			}	
		}
	}


	if(typeof req.query.category === 'object'){
		for(categoryName of req.query.category){
			const categoryData = await categories.findOne({ where: { categoryName: categoryName }});
			const categoryId = categoryData.dataValues.categoryId;
			const categoriesOfCourseData = await categoriesOfCourse.findAll({
				where: {
					categoryId: categoryId
				}
			});
			for (courseData of coursesData){
				const index = categoriesOfCourseData.indexOf(categoriesOfCourseData.find((categoryOfCourseData) => categoryOfCourseData.dataValues.courseId === courseData.courseId));
				if(index === -1) {
					const deleteIndex = coursesData.indexOf(courseData);
					coursesData = [...coursesData.slice(0,deleteIndex),...coursesData.slice(deleteIndex+1,coursesData.length)]; 
				}	
			}
		}
	}

	if(req.query.name!="" && req.query.name!= undefined){
		coursesData = coursesData.filter((course) => {
			return (course.name.indexOf(req.query.name)!=-1);
		});
	}

	if(req.query.overView!="" && req.query.overView!= undefined){
		coursesData = coursesData.filter((course) => {
			return (course.overView.indexOf(req.query.overView)!=-1);
		});
	}

	const resultCourses = coursesData.slice(0,10);
	for(courseData of resultCourses)
	{
			const resultCourse = {...courseData};
			resultCourse.categories = [];
			const categoriesOfCourseData = await categoriesOfCourse.findAll({ where:{ courseId:courseData.courseId } });
			for(const categoryOfCourseData of categoriesOfCourseData){
				const categoryData = await categories.findOne({ where:{categoryId: categoryOfCourseData.dataValues.categoryId} });
				resultCourse.categories.push(categoryData.dataValues.categoryName);
			}
			// push course into Courses array
			Courses.push(resultCourse);
	}
	return Courses;
}

exports.getEditCourse = async function(req){
	let resultCourse;
	const courseData = await courses.findOne({
		where:{
			courseId: req.params.courseId
		}
	});
	resultCourse = {
		...courseData.dataValues
	};

	resultCourse.tasksOfCourse = [];
	const tasksOfCourseData = await tasksOfCourse.findAll({
		where: {
			courseId: req.params.courseId
		}
	});
	for(taskOfCourseData of tasksOfCourseData){
		resultCourse.tasksOfCourse.push(taskOfCourseData.dataValues);
	}

	resultCourse.documents = [];
	const documentsData = await documents.findAll({
		where: {
			courseId: req.params.courseId
		}
	});
	for(documentData of documentsData){
		resultCourse.documents.push(documentData.dataValues);
	}
	resultCourse.reports = [];
	let startDay = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'); 
	let endDay = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'); 
	resultCourse.reports = await db.sequelize.query(`select * from reporthistories 
	join trainees on reporthistories.traineeId = trainees.traineeId
	join users on trainees.userId = users.userId
	where
	  reporthistories.courseId = ${req.params.courseId}
	  and reporthistories.createdAt > '${startDay}'
	  and reporthistories.createdAt < '${endDay}'
	`,{
			type: db.sequelize.QueryTypes.SELECT
	});

	return resultCourse;

}

exports.getCourseFromTaskInEnroll = async function(req){
	let courseFromTaskInEnroll = await db.sequelize.query(`select courses.*
	from tasksinenroll
	join enrollhistories on tasksinenroll.enrollhistoryId = enrollhistories.enrollhistoryId
	join courses on enrollhistories.courseId = courses.courseId
	where tasksinenroll.taskinenrollId = ${req.params.taskInEnrollId}`,{
		type: db.sequelize.QueryTypes.SELECT
	});
	return courseFromTaskInEnroll[0];
}

exports.makePublicCourse = async function(req){
	try{
		const upDateCourse = await courses.update(
			{statusCourse: 'public'},
			{returning: true, where: {courseId: req.params.courseId}}
		);
		return upDateCourse;
	} catch (err){
		console.log(err);
		return null;
	}
}