const { Model } = require('sequelize');
const Sequelize = require('sequelize');

const Users = require('../models/user');

module.exports = (sequelize,DataTypes) => {
  class Trainees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // define association here
      this.belongsTo(models.Users,{ foreignKey: 'userId'});
    }
  }
  Trainees.init(
    {
      traineeId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      },
      statusBlock: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
    },
    {
      sequelize,
      modelName: 'Trainees',
      freezeTableName: true
    },
  );
  return Trainees;
};
