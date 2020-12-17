const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jsonwebtoken');

const db = require('../models/index');

const { saltRounds } = require('../config/constants');
const {jwtSecret} = require('../config/constants');

const users = db['Users'];

exports.createUser = async function(data){
  let userType = 'trainee';
  if(data.userType === 'supervisor')
    userType = 'supervisor';
  if(data.userType === 'admin')
    userType = 'admin';

  let { password } = data;
  password = await bcrypt.hash(password, saltRounds);
  try{
  const newUser = await users.create({
    email: data.email,
    password: password,
    name: data.name,
    address: data.address,
    tel: +data.tel,
    birthday: new Date(data.birthday),
    createdAt: moment(),
    updatedAt: moment(),
    userType: userType
  });
  return newUser;
  }
  catch(err){
  console.log(err);
  return err;
  }
  return null;
}

 exports.findUser = async function(data){
  try{
    const user = await users.findOne({ where: { email: data.email } });
    if(user === null)
    {
      return null;
    }
    let dataUser = user.dataValues;
    dataUser.birthday = dataUser.birthday.toLocaleString().split(',')[0];
    return dataUser;
  } catch(err){
  console.log(err);
  return null;
  }
  return null;
}

exports.updateProfile = async function(data,oldUser){
  const userData = await users.findOne({ where: { email: oldUser.email } });
  const user = userData.dataValues;
  try{
    const compare = await bcrypt.compare(data.oldPassword,user.password);
    if(compare === false)
    {
      return {message: 'Your password are wrong!'};
    }
  } catch(err){
    console.log(err);
    return err;
  }
  let newUserData = {...data};
  for(element in newUserData){
    if (newUserData[element] == "" || newUserData[element] == "null" || newUserData[element] == undefined || newUserData[element] == null || newUserData[element] == 'undefined')
      delete newUserData[element];
  }
  if(newUserData.password)
    newUserData.password = await bcrypt.hash(newUserData.password, saltRounds);
  try{
    const update = await users.update(
        {...newUserData},
        {returning: true, where: {email: user.email}}
    );
    
    const newUser = (await users.findOne({ where: { userId: oldUser.userId }})).dataValues;
    var payload = { email: newUser.email };
    let jwtToken = jwt.sign(payload, jwtSecret);
    return jwtToken;
  } catch(err){
    return err;
  }	
  
  return null;
}