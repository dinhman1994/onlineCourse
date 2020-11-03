const bcrypt = require('bcrypt');
const moment = require('moment');

const db = require('../models/index');

const { saltRounds } = require('../config/constants');

const supervisors = db['Supervisors'];
const courses = db['Courses'];
const supervisorCourses = db['SupervisorCourses'];
const categoriesOfCourse = db['CategoriesOfCourse'];
const categories = db['Categories'];

exports.createSupervisor = async function(data){
  try{
	const newSupervisor = await supervisors.create({
	  createdAt: moment(),
	  updatedAt: moment(),
	  userId: data.userId
	});
	return newSupervisor;
  }
  catch(err){
	console.log(err);
	return null;
  }
  return null;
}

exports.findSupervisor = async function(data){
  	try{
		const supervisor = await supervisors.findOne({ where: { userId: data.userId } });
		console.log("???");
		if(supervisor === null)
		{
		  console.log("you are anonymous");
		  return null;
		}
		return supervisor;
  	} catch(err){
		console.log(err);
		return null;
  	}
 	return null;
}

exports.getSupervisorCourses = async function(data){
	try{
		let Courses=[];
		const supervisorData = await supervisors.findOne({ where: { userId: data.userId } });
		const supervisor = supervisorData.dataValues;
		const supervisorCoursesData = await supervisorCourses.findAll({ where:{supervisorId: supervisor.supervisorId} });
		for(const dataValue of supervisorCoursesData){
			const courseData = await courses.findOne({ where: { courseId: dataValue.dataValues.courseId} });
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
		
	} catch (err){
		console.log(err);
		return null;
	}
	
	return null;
}