module.exports.checkSupervisor =  async function(req, res, next) {
  if (req.cookies.token) {
      if (req.session.user.userType != 'supervisor') return res.redirect('/');
    return next();    
  }
  return res.redirect('/');
}