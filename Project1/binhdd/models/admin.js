const { Model } = require('sequelize');
const Sequelize = require('sequelize');

const Users = require('../models/user');
const Supervisors = require('../models/supervisor');

module.exports = (sequelize,DataTypes) => {
  class Admins extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users,{foreignKey: 'userId'});
      this.belongsTo(models.Supervisors,{foreignKey: 'supervisorId'});
      // define association here
    }
  }
  Admins.init(
    {
      adminId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      },
    },
    {
      sequelize,
      modelName: 'Admins',
      freezeTableName: true
    },
  );
  return "Admins";
};
