const db = require('../models/index');
const trainees = db['Trainees'];
const courses = db['Courses'];

const courseService = require('../services/courseService');

module.exports.checkTrainee =  async function(req, res, next) {
    if (req.session.user.userType != 'trainee') return res.redirect('/');

    const trainee = await trainees.findOne({ where: { userId: req.session.user.userId }});
    if(trainee === null) return res.redirect('/');
    if(trainee.dataValues.statusBlock === true){
      return res.redirect('/');
    }
    if(trainee.dataValues.deletedAt != null){
      return res.redirect('/');
    }
    req.session.trainee = trainee.dataValues;
    return next();    
  
  return res.redirect('/');
};

module.exports.checkSecretKey = async function(req,res,next) {
  const courseData = await courses.findOne({
    where:{
      courseId: req.params.courseId
    }
  });
  if(courseData.dataValues.typeOfCourse === 'limited')
  {
    if(req.body.secretKey === undefined){
      return res.render('enterSecretKey',{user: req.session.user, url: req.originalUrl});
    }
  
    if(req.body.secretKey != courseData.dataValues.secretKey){
      const error = new Error('You must have SecretKey in limited Course');
      return res.render('enterSecretKey',{user: req.session.user, url: req.originalUrl, error: error});
    }
  }
  return next();

}