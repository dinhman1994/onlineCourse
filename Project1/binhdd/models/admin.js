const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize,DataTypes) => {
  class Admins extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
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
      }
    },
    {
      sequelize,
      modelName: 'Admins',
      freezeTableName: true
    },
  );
  Admins.associate = models => {
    // Admins.belongsTo(models.Users,{as: 'user'});
    // Admins.belongsTo(models.Supervisors,{as: 'supervisor'});
  };
  return "Admins";
};
