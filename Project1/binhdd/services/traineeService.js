const bcrypt = require('bcrypt');
const moment = require('moment');
const traineeModel = require('../models/trainee');
const { sequelize } = require('../models/index');

const { saltRounds } = require('../config/constants');

const trainees = traineeModel(sequelize);

exports.createTrainee = async function(data){
  try{
	const newTrainee = await trainees.create({
	  statusBlock: false,
	  createdAt: moment(),
	  updatedAt: moment(),
	  userId: data.userId 
	});
	return newTrainee;
  }
  catch(err){
	console.log(err);
	return err;
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