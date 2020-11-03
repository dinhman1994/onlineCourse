const db = require('../models/index');
const trainees = db['Trainees'];

module.exports.checkTrainee =  async function(req, res, next) {
    if (req.session.user.userType != 'trainee') return res.redirect('/');

    const trainee = await trainees.findOne({ where: { userId: req.session.user.userId }});
    if(trainee === null) return res.redirect('/');

    return next();    
  
  return res.redirect('/');
};