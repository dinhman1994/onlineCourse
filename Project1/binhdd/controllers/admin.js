const userService = require('../services/userService');
const categoryService = require('../services/categoryService');

module.exports.admin = async function(req,res) {
	if(!req.session.user){
		return res.redirect('/');
	}
	res.render('admin',{ user:req.session.user });
}

module.exports.createCourse = async function(req,res) {
	if(!req.session.user){
		return res.redirect('/');
	}
	res.render('adminCreateCourse',{ user:req.session.user });
}

module.exports.profile = async function(req,res) {
	if(!req.session.user){
		return res.redirect('/');
	}
	res.render('adminProfile',{ user:req.session.user });
}

module.exports.category = function(req,res) {
	if(!req.session.user){
		return res.redirect('/');
	}
	res.render('createCategory',{ user:req.session.user });
}

module.exports.createCategory = async function(req,res) {
	if(!req.session.user){
		return res.redirect('/');
	}
	const newCategory = await categoryService.createCategory(req.body);
	if(newCategory === null)
		return res.render('createCategory',{ user:req.session.user, message: 'Something Wrong !' });
	return res.render('createCategory',{ user:req.session.user, message: 'Success create New Category !' });
}