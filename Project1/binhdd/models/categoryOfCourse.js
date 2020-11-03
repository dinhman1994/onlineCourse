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
      this.belongsTo(models.Courses,{ foreignKey: 'courseId'});
      this.belongsTo(models.Categories,{ foreignKey: 'categoryId'});
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
  return CategoriesOfCourse;
};
