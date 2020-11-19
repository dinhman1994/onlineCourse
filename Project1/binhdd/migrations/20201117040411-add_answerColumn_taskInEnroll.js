'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'TasksInEnroll', // name of Source model
      'answer', // name of the key we're adding 
      {
        type: Sequelize.STRING,
        allowNull: false
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
