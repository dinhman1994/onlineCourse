const userService = require('../../services/userService');

exports.login = async (req, res, next) => {
  const user = await userService.checkUserCredentials({
    email: req.body.email,
    password: req.body.password,
  });

  if (!user) {
    return res.render('auth/login', { message: 'Email or password was wrong' });
  }

  res.render('dashboard');
};
