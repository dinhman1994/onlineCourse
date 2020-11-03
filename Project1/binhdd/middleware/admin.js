const db = require('../models/index');
const supervisors = db['Supervisors'];

module.exports.checkAdmin =  async function(req, res, next) {
    if (req.session.user.userType != 'admin') return res.redirect('/');

    const admin = await supervisors.findOne({ where: { userId: req.session.user.userId }});
    if(admin.get('isAdmin') === false) return res.redirect('/');

    return next();    
  
  return res.redirect('/');
};