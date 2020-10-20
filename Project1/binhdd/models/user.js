const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize,DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        len: [2,15],
        allowNull: false
      },
      address: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: ''
      },
      tel: {
        type: Sequelize.DataTypes.BIGINT(10),
        allowNull: false 
      },
      birthday: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      userType: {
        type: Sequelize.DataTypes.ENUM('trainee','supervisor','admin'),
        defaultValue: 'trainee'
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE
        // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()')
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE 
        // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()')
      }
    },
    {
      sequelize,
      modelName: 'Users',
      freezeTableName: true
    },
  );
  return Users;
};
