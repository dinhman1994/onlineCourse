const bcrypt = require('bcrypt');
const moment = require('moment');

const db = require('../models/index');

const { saltRounds } = require('../config/constants');

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
	
	data.password = await bcrypt.hash(data.password, saltRounds);

	if(data.email != user.email){
		try{
			const newUser = await users.update(
			   {...data},
			   {returning: true, where: {email: user.email}}
			);
			return newUser;	
		} catch(err){
			return err;
		}	
	}
	return null;
}