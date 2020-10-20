const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize,DataTypes) => {
  class Supervisors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Supervisors.init(
    {
      supervisorId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      }
    },
    {
      sequelize,
      modelName: 'Supervisors',
      freezeTableName: true
    },
  );
  Supervisors.associate = models => {
    // Supervisors.belongsTo(models.Users,{ as: 'user'});
    // Supervisors.belongsTo(models.Courses,{ as: 'course'});
  };
  return Supervisors;
};
