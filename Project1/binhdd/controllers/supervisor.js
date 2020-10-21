const userService = require('../services/userService');

module.exports.supervisor = async function(req,res) {
	if(!req.session.user){
		return res.redirect('/');
	}
	res.render('supervisor',{ user:req.session.user });
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
	res.render('supervisorProfile',{ user:req.session.user });
}