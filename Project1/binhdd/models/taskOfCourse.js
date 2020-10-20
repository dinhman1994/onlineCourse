const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize,DataTypes) => {
  class TasksOfCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TasksOfCourse.init(
    {
      taskId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      },
      question: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      sequelize,
      modelName: 'TasksOfCourse',
      freezeTableName: true
    },
  );
  TasksOfCourse.associate = models => {
    // TasksOfCourse.belongsTo(models.Courses,{ as: 'course'});
  };
  return TasksOfCourse;
};
