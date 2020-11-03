const moment = require('moment');

const db = require('../models/index');

const { saltRounds } = require('../config/constants');
const { supervisor } = require('../controllers/supervisor');

const courses = db['Courses'];
const categoriesOfCourse = db['CategoriesOfCourse'];
const categories = db['Categories'];
const supervisorCourses = db['SupervisorCourses'];
const supervisors = db['Supervisors'];

exports.createCourse = async function(data,user){
  try{
	const newCourse = await courses.create({
	  ...data,
	  createdAt: moment(),
	  updatedAt: moment()
	});

	if(typeof data.category === "string"){
		const category = await categories.findOne({ where:{categoryName: data.category} });
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
	if(typeof data.category === 'object'){
		// Need something here
		for(const categoryName of data.category){
			const category = await categories.findOne({ where:{categoryName: categoryName} });
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