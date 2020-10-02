const bcrypt = require('bcrypt');
const { user } = require('../models/index');

exports.checkUserCredentials = async function (data) {
  const candidateUser = await user.findOne({
    where: {
      email: data.email,
    },
  });

  if (!candidateUser) {
    return false;
  }

  if (!bcrypt.compareSync(data.password, candidateUser.password)) {
    return false;
  }

  return candidateUser;
};
