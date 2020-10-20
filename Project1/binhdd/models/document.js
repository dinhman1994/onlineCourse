const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize,DataTypes) => {
  class Documents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Documents.init(
    {
      documentId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      },
      type: {
        type: Sequelize.DataTypes.ENUM('file','img','pdf'),
        defaultValue: 'pdf'
      },
      path: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
        // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()')
      } 
    },
    {
      sequelize,
      modelName: 'Documents',
      freezeTableName: true
    },
  );
  Documents.associate = models => {
    // Documents.belongsTo(models.Courses,{ as: 'course'});
  };
  return Documents;
};
