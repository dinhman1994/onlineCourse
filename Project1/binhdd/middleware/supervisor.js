const db = require('../models/index');
const supervisors = db['Supervisors'];

module.exports.checkSupervisor =  async function(req, res, next) {
    if (req.session.user.userType != 'supervisor') return res.redirect('/');

    const supervisor = await supervisors.findOne({ where: { userId: req.session.user.userId }});
    if(supervisor === null) return res.redirect('/');

    return next();    
  
  return res.redirect('/');
};


