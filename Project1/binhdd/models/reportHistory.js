const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize,DataTypes) => {
  class ReportHistories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ReportHistories.init(
    {
      reportHistoryId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      },
      reportContent: {
        type: Sequelize.DataTypes.STRING(80),
      },
      timeWrite: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'ReportHistories',
      freezeTableName: true
    },
  );
  ReportHistories.associate = models => {
    // ReportHistories.belongsTo(models.Courses,{ as: 'course'});
    // ReportHistories.belongsTo(models.Trainees,{ as: 'trainee'});
  };
  return ReportHistories;
};