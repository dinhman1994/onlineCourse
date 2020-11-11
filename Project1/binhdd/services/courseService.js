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

exports.getCourses = async function(data){
	let Courses = [];
	if(data.category===undefined && data.name===undefined)
	{
		const coursesData = await courses.findAll({
			where: {
			},
			limit: 10
		});
		for(courseData of coursesData)
		{
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
	if(typeof data.category === "string"){
		//filter something ??
		const categoryData = await categories.findOne({ where: { categoryName: data.category } });
		const categoryId = categoryData.dataValues.categoryId;
		const categoriesOfCourseData = await categoriesOfCourse.findAll({
			where: {
				categoryId: categoryId
			},
			limit: 10
		});
		for(const dataValue of categoriesOfCourseData){
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
	}
	if(data.name!=undefined && Courses.length===0)
	{

		const coursesData = await courses.findAll({
			where: {	  
				name: `%${data.name}%`
			}
		});
		for(courseData of coursesData)
		{
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
	}
	if(data.name!=undefined)
	{
		Courses = Courses.filter( (course) => {
			return (course.name.indexOf(data.name)!=-1);
		});
	}	  
	return Courses;
}

exports.getEditCourse = async function(data){
	let resultCourse;
	const courseData = await courses.findOne({
		where:{
			courseId: data.courseId
		}
	});
	resultCourse = {
		...courseData.dataValues
	};

	resultCourse.tasksOfCourse = [];
	const tasksOfCourseData = await tasksOfCourse.findAll({
		where: {
			courseId: data.courseId
		}
	});
	for(taskOfCourseData of tasksOfCourseData){
		resultCourse.tasksOfCourse.push(taskOfCourseData.dataValues);
	}

	resultCourse.documents = [];
	const documentsData = await documents.findAll({
		where: {
			courseId: data.courseId
		}
	});
	for(documentData of documentsData){
		resultCourse.documents.push(documentData.dataValues);
	}

	return resultCourse;

}