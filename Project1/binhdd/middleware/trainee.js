module.exports.checkTrainee =  async function(req, res, next) {
  if (req.cookies.token) {
      if (req.session.user.userType != 'trainee') return res.redirect('/');
    return next();    
  }
  return res.redirect('/');
};