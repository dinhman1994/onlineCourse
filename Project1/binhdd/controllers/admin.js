const userService = require('../services/userService');

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
	res.render('createCourse',{ user:req.session.user });
}

module.exports.profile = async function(req,res) {
	if(!req.session.user){
		return res.redirect('/');
	}
	res.render('adminProfile',{ user:req.session.user });
}