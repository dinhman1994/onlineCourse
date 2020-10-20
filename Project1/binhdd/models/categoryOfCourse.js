const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize,DataTypes) => {
  class CategoriesOfCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CategoriesOfCourse.init(
    {
      cateOfCourseId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      }
    },
    {
      sequelize,
      modelName: 'CategoriesOfCourse',
      freezeTableName: true
    },
  );
  CategoriesOfCourse.associate = models => {
    // CategoriesOfCourse.belongsTo(models.Courses,{ as: 'course'});
    // CategoriesOfCourse.belongsTo(models.Categories,{ as: 'category'});
  };
  return CategoriesOfCourse;
};
