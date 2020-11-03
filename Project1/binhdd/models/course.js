const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize,DataTypes) => {
  class Courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Courses.init(
    {
      courseId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      },
      timeOfCourse: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      overView: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
        defaultValue: ''
      },
      name: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
        defaultValue: ''
      },
      createDay: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      statusCourse: {
        type: Sequelize.DataTypes.ENUM('private','public'),
        defaultValue: 'private'
      },
      typeOfCourse: {
        type: Sequelize.DataTypes.ENUM('free','limited'),
        defaultValue: 'limited'
      },
      secretKey: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: ''
      }
    },
    {
      sequelize,
      modelName: 'Courses',
      freezeTableName: true
    },
  );
  return Courses;
};
