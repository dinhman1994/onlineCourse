const bcrypt = require('bcrypt');
const moment = require('moment');
const { admin } = require('googleapis/build/src/apis/admin');

('use strict');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = bcrypt.hashSync('123456', 10);

    const adminUser = await queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'admin@gmail.com',
          password,
          name: 'admin',
          address: 'asdasf',
          tel: '0326621539',
          birthday: '2015-03-27 00:00:00',
          userType: 'admin',
          createdAt: new Date(moment()),
          updatedAt: new Date(moment())
        },
      ],
      { returning: true },
    );
    const adminSupervisor = await queryInterface.bulkInsert(
      'supervisors',
      [
        {
          createdAt: new Date(moment()),
          updatedAt: new Date(moment()),
          userId: adminUser,
          isAdmin: true
        },
      ],
      { returning: true },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
