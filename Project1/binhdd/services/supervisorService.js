const bcrypt = require('bcrypt');
const moment = require('moment');

const db = require('../models/index');

const { saltRounds } = require('../config/constants');

const supervisors = db['Supervisors'];
const courses = db['Courses'];
const supervisorCourses = db['SupervisorCourses'];
const categoriesOfCourse = db['CategoriesOfCourse'];
const categories = db['Categories'];
const tasksInEnroll = db['TasksInEnroll'];
const enrollHistories = db['EnrollHistories'];
const trainees = db['Trainees'];

exports.getAllSupervisor = async function(req){
    
    try{
      const supervisorInfor = await db.sequelize.query(`select * from 
      supervisors
      join users on supervisors.userId = users.userId
      where not supervisors.supervisorId = ${req.session.supervisor.supervisorId}`,{
        type: db.sequelize.QueryTypes.SELECT
      });
      return supervisorInfor;
    } catch(err){
      console.log(err);
      return null;
    }
    
    return null;
}

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
    if(supervisor === null)
    {
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

exports.addSupervisorCourse = async function(req){
  try{
    const newSupervisorCourse = await supervisorCourses.create({
      courseId: req.params.courseId,
      supervisorId: req.params.supervisorId,
      createdAt: moment(),
        updatedAt: moment()
    });
    return newSupervisorCourse;
  } catch (err){
    console.log(err);
    return null;
  }
  
  return null;
}

exports.checkAnswer = async function(req){
  const taskInEnrollData = await tasksInEnroll.findOne({
    where: {
      taskInEnrollId: req.params.taskInEnrollId
    }
  });
  const taskInEnroll = taskInEnrollData.dataValues;
  let result = true;
  if(req.body.result === 'false')
    result = false;
  try{
    const resultOfQuestion = await tasksInEnroll.update(
      {...taskInEnroll,
      status: true,
      result: result
      },
      {returning: true, where: {taskInEnrollId: req.params.taskInEnrollId}}
     );
    return resultOfQuestion; 
  } catch(err){
    console.log(err);
    return null;
  }
  
  return null;
}

exports.addTrainee = async function(req){
  const traineeData = await trainees.findOne({ where: {traineeId: req.params.traineeId} });
  const courseData = await courses.findOne({ where: {courseId: req.params.courseId} });
  if ( traineeData.dataValues.statusBlock===false )
  {
    const newEnrollHistory = await enrollHistories.create({
      process: parseFloat(0),
      startDay: moment(),
      endDay: moment().add(courseData.dataValues.timeOfCourse,'days'),
      statusEnroll: false,
      createdAt: moment(),
      updatedAt: moment(),
      courseId: req.params.courseId,
      traineeId: req.params.traineeId
    });
    return newEnrollHistory;
  }
  return null;
}

exports.getSupervisors = async function(req){
  if (req.query.email === undefined)
    return [];
  let SupervisorsData = await db.sequelize.query(`select * from 
  supervisors
  join users on supervisors.userId = users.userId
  where users.email like '%${req.query.email}%'`,{
    type: db.sequelize.QueryTypes.SELECT
  });
  let supervisorsInCourseData = await this.supervisorsInCourse(req);
  for(supervisorInCourseData of supervisorsInCourseData){
    SupervisorsData = SupervisorsData.filter((supervisorData) => {
      return supervisorData.supervisorId != supervisorInCourseData.supervisorId
    });
  }
  return SupervisorsData;
}


exports.supervisorsInCourse = async function(req){
  const supervisorsInCourse = await db.sequelize.query(`select supervisors.*,courses.courseId,users.name, users.email from 
  supervisors
    join users on supervisors.userId = users.userId
  join supervisorcourses on supervisors.supervisorId = supervisorcourses.supervisorId
    join courses on supervisorcourses.courseId = courses.courseId
  where courses.courseId = ${req.params.courseId}`,{
    type: db.sequelize.QueryTypes.SELECT
  }
  );
  return supervisorsInCourse;
}

exports.getSupervisorInfor = async function(req){
  try{
    const supervisorInfor = await db.sequelize.query(`select * from 
    supervisors
    join users on supervisors.userId = users.userId
    where supervisors.supervisorId = ${req.params.supervisorId}`,{
      type: db.sequelize.QueryTypes.SELECT
    });
    return supervisorInfor;
  } catch(err){
    console.log(err);
    return null;
  }
  
  return null;
}