'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    // Admins.belongsTo(models.Users,{as: 'user'});
     return queryInterface.changeColumn(
      'Courses', // name of Source model
      'statusCourse', // name of the key we're adding 
      {
        type: Sequelize.ENUM('private', 'public'),
        defaultValue: 'private'
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
