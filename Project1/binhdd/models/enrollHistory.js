const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize,DataTypes) => {
  class EnrollHistories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Courses,{ foreignKey: 'courseId'});
      this.belongsTo(models.Trainees,{ foreignKey: 'traineeId'});
    }
  }
  EnrollHistories.init(
    {
      enrollHistoryId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      },
      process: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
      },
      startDay: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      endDay: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      statusEnroll: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'EnrollHistories',
      freezeTableName: true
    },
  );
  return EnrollHistories;
};
