const db = require('../models/index');
const testsModel = require('../models/test');
const { sequelize } = require('../models/index');

const tests = testsModel(sequelize);

exports.createTest = async function(){

	try{
	const result = await tests.create({
	    	name: 'janedoe'
  		});
	console.log('Some thing is not clear');
	} catch (err){
		console.log(err);
	}
	return('');
}