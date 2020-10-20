const userService = require('../services/userService');

module.exports.trainee = async function(req,res) {
	if(!req.session.user){
		return res.redirect('/');
	}
	res.render('trainee',{ user:req.session.user });
}

module.exports.yourCourses = async function(req,res) {
	if(!req.session.user){
		return res.redirect('/');
	}
	res.render('yourCourses',{ user:req.session.user });
}

module.exports.profile = async function(req,res) {
	if(!req.session.user){
		return res.redirect('/');
	}
	res.render('profile',{ user:req.session.user });
}