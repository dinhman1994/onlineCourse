const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = (sequelize,DataTypes) => {
    class SupervisorCourses extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        this.belongsTo(models.Courses,{foreignKey: 'courseId'});
        this.belongsTo(models.Supervisors,{foreignKey: 'supervisorId'});
        // define association here
      }
    }
    SupervisorCourses.init(
      {
        supervisorCourseId: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          unique: true,
          primaryKey: true
        }
      },
      {
        sequelize,
        modelName: 'SupervisorCourses',
        freezeTableName: true
      },
    );
    return SupervisorCourses;
  };
  