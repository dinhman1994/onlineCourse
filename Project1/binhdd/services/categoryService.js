const moment = require('moment');

const db = require('../models/index');

const { saltRounds } = require('../config/constants');

const categories = db['Categories'];

exports.createCategory = async function(data){
  try{
	const newCategory = await categories.create({
	  ...data,
	  createdAt: moment(),
	  updatedAt: moment()
	});
	return newCategory;
  }
  catch(err){
	console.log(err);
	return null;
  }
  return null;
}

exports.getCatagories = async function(){
	try{
		const ListCategories = await categories.findAll();
		let categoriesName = [];
		for(const Category of ListCategories){
			categoriesName.push(Category.dataValues.categoryName);
		}
		return categoriesName;
	} catch(err)
	{
		console.log(err);
		return null;
	}
	return null;
}