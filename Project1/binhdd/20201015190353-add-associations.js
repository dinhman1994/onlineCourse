'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    // Admins.belongsTo(models.Users,{as: 'user'});
     return queryInterface.addColumn(
      'Admins', // name of Source model
      'userId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // name of Target model
          key: 'userId', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
      .then(() => {
        // Admins.belongsTo(models.Supervisors,{as: 'supervisor'});
        return queryInterface.addColumn(
          'Admins', // name of Target model
          'supervisorId', // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'Supervisors', // name of Source model
              key: 'supervisorId',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      })
      .then(() => {
       // CategoriesOfCourse.belongsTo(models.Courses,{ as: 'course'});
        return queryInterface.addColumn(
          'CategoriesOfCourse', // name of Target model
          'courseId', // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'Courses', // name of Source model
              key: 'courseId',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      })
      .then(() => {
       // CategoriesOfCourse.belongsTo(models.Categories,{ as: 'category'});
        return queryInterface.addColumn(
          'CategoriesOfCourse', // name of Target model
          'categoryId', // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'Categories', // name of Source model
              key: 'categoryId',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      })
      .then(() => {
        // Documents.belongsTo(models.Courses,{ as: 'course'});
        return queryInterface.addColumn(
          'Documents', // name of Target model
          'courseId', // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'Courses', // name of Source model
              key: 'courseId',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      })
      .then(() => {
        // EnrollHistories.belongsTo(models.Courses,{ as: 'course'});
        return queryInterface.addColumn(
          'EnrollHistories', // name of Target model
          'courseId', // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'Courses', // name of Source model
              key: 'courseId',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      })
      .then(() => {
        // EnrollHistories.belongsTo(models.Trainees,{ as: 'trainee'});
        return queryInterface.addColumn(
          'EnrollHistories', // name of Target model
          'traineeId', // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'Trainees', // name of Source model
              key: 'traineeId',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      })
      .then(() => {
        // ReportHistories.belongsTo(models.Courses,{ as: 'course'});
        return queryInterface.addColumn(
          'ReportHistories', // name of Target model
          'courseId', // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'Courses', // name of Source model
              key: 'courseId',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      })
      .then(() => {
        // ReportHistories.belongsTo(models.Trainees,{ as: 'trainee'});
        return queryInterface.addColumn(
          'ReportHistories', // name of Target model
          'traineeId', // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'Trainees', // name of Source model
              key: 'traineeId',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      })
      .then(() => {
        // Supervisors.belongsTo(models.Users,{ as: 'user'});
        return queryInterface.addColumn(
          'Supervisors', // name of Target model
          'userId', // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'Users', // name of Source model
              key: 'userId',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      })
      .then(() => {
        // Supervisors.belongsTo(models.Courses,{ as: 'course'});
        return queryInterface.addColumn(
          'Supervisors', // name of Target model
          'courseId', // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'Courses', // name of Source model
              key: 'courseId',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      })
      .then(() => {
        // TasksInEnroll.belongsTo(models.TasksOfCourse,{ as: 'task'});
        return queryInterface.addColumn(
          'TasksInEnroll', // name of Target model
          'taskId', // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'TasksOfCourse', // name of Source model
              key: 'taskId',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      })
      .then(() => {
        // TasksInEnroll.belongsTo(models.EnrollHistories,{ as: 'enroll'});
        return queryInterface.addColumn(
          'TasksInEnroll', // name of Target model
          'enrollHistoryId', // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'EnrollHistories', // name of Source model
              key: 'enrollHistoryId',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      })
      .then(() => {
        // TasksOfCourse.belongsTo(models.Courses,{ as: 'course'});
        return queryInterface.addColumn(
          'TasksOfCourse', // name of Target model
          'courseId', // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'Courses', // name of Source model
              key: 'courseId',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      })
      .then(() => {
        // Trainees.belongsTo(models.Users,{ as: 'user'});
        return queryInterface.addColumn(
          'Trainees', // name of Target model
          'userId', // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'Users', // name of Source model
              key: 'userId',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      });
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
