'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Trainees', // name of Target model
      'timeOfFail', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    );
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
