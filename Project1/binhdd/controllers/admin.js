const userService = require('../services/userService');
const supervisorService = require('../services/supervisorService');
const traineeService = require('../services/traineeService');
const categoryService = require('../services/categoryService');

module.exports.manage = async function(req,res){
  const supervisors = await supervisorService.getAllSupervisor(req);
  const searchedTrainee = await traineeService.getSearchedTraineesNotBlock(req);
  const traineesIsBlocked = await  traineeService.getTraineesIsBlocked();
  return res.render('manage',{
    user : req.session.user, 
    supervisors : supervisors,
    trainees : searchedTrainee,
    traineesIsBlocked : traineesIsBlocked
   });
}

module.exports.deleteTrainee = async function(req,res){
  const deletedTrainee = await traineeService.deleteTrainee(req);
  return res.redirect('/admin/manage');
}

module.exports.unblockTrainee = async function(req,res){
  const unblockedTrainee = await traineeService.unblockTrainee(req);
  return res.redirect('/admin/manage');
}
  