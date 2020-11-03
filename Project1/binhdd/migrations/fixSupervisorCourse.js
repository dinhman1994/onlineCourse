'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    // Admins.belongsTo(models.Users,{as: 'user'});
     return queryInterface.removeColumn(
      'Supervisors', // name of Source model
      'courseId', // name of the key we're adding 
    )
    .then(() => {
        return queryInterface.createTable(
            'SupervisorCourses',{
                supervisorCourseId: {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    unique: true,
                    primaryKey: true
                },
                courseId: {
                    type: Sequelize.INTEGER,
                    references: {
                    model: 'Courses', // name of Target model
                    key: 'courseId', // key in Target model that we're referencing
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL'
                },
                supervisorId: {
                    type: Sequelize.INTEGER,
                    references: {
                    model: 'Supervisors', // name of Target model
                    key: 'supervisorId', // key in Target model that we're referencing
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL'
                },
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false
                }
            }
        )
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