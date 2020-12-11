const db = require('../models/index');
const supervisors = db['Supervisors'];

module.exports.checkAdmin =  async function(req, res, next) {
    if (req.session.user.userType != 'admin') {
      if(req.session.user){
        return res.render('adminAlert',{user: req.session.user});
      }
      return res.redirect('/');
    }

    const supervisor = await supervisors.findOne({ where: { userId: req.session.user.userId }});
    if(supervisor === null) return res.redirect('/');
    req.session.supervisor = supervisor.dataValues;
    
    const admin = await supervisors.findOne({ where: { userId: req.session.user.userId }});
    if(admin.get('isAdmin') === false) return res.redirect('/');

    return next();    
  
  return res.redirect('/');
};