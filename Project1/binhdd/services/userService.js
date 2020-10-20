const bcrypt = require('bcrypt');
const moment = require('moment');
const usersModel = require('../models/user');
const { sequelize } = require('../models/index');

const { saltRounds } = require('../config/constants');

const users = usersModel(sequelize);

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
		console.log("you are anonymous");
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