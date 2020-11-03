'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    // Admins.belongsTo(models.Users,{as: 'user'});
     return queryInterface.addColumn(
      'Supervisors', // name of Source model
      'isAdmin', // name of the key we're adding 
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};