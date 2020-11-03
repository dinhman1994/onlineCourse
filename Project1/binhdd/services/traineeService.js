const bcrypt = require('bcrypt');
const moment = require('moment');

const db = require('../models/index');

const { saltRounds } = require('../config/constants');

const trainees = db['Trainees'];

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