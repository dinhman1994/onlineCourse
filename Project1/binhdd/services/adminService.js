const bcrypt = require('bcrypt');
const moment = require('moment');

const db = require('../models/index');

const { saltRounds } = require('../config/constants');

const supervisors = db['Supervisors'];

exports.createAdmin = async function(data){
  try{
    const newSupervisor = await supervisors.create({
      createdAt: moment(),
      updatedAt: moment(),
      userId: data.userId,
      isAdmin: true
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