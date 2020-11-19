const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize,DataTypes) => {
  class TasksInEnroll extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.TasksOfCourse,{ foreignKey: 'taskId'});
      this.belongsTo(models.EnrollHistories,{ foreignKey: 'enrollHistoryId'});
    }
  }
  TasksInEnroll.init(
    {
      taskInEnrollId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      },
      status: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      answer: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      result: {
        type: Sequelize.DataTypes.BOOLEAN,
      }
    },
    {
      sequelize,
      modelName: 'TasksInEnroll',
      freezeTableName: true
    },
  );
  return TasksInEnroll;
};
