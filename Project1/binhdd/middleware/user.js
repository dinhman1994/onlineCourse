const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/constants');
const userService = require('../services/userService');

module.exports.checkToken =  async function(req, res, next) {
  if (req.cookies.token) {
    if(!req.session.user)
    {
      const token = req.cookies.token;  
      const data = await jwt.verify(token,jwtSecret);
      const user = await userService.findUser(data);
      if (user===null) return res.redirect('/');
      req.session.user = {
      ...user,
      password: ''
      }
    }
    return next();    
  }

  return res.redirect('/');
};

