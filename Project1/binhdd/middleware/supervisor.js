const db = require('../models/index');
const supervisors = db['Supervisors'];

module.exports.checkSupervisor =  async function(req, res, next) {
    if(!req.session.user)
      return res.redirect('/');
    if (req.session.user.userType === 'trainee') 
      return res.render('supervisorAlert',{user: req.session.user});
      
    const supervisor = await supervisors.findOne({ where: { userId: req.session.user.userId }});
    if(supervisor === null) return res.redirect('/');
    req.session.supervisor = supervisor.dataValues;
    return next();    
  
  return res.redirect('/');
};


