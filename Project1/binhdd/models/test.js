const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize,DataTypes) => {
  class Tests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tests.init(
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
      modelName: 'Tests',
      freezeTableName: true
    },
  );
  Tests.associate = models => {
    // Tests.belongsTo(models.Users,{as: 'user'});
    // Tests.belongsTo(models.Supervisors,{as: 'supervisor'});
  };
  return "Tests";
};
