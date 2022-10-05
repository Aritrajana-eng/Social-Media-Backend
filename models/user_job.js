'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_job.init({
    user_id: DataTypes.INTEGER,
    from_year: DataTypes.DATE,
    to_year: DataTypes.DATE,
    job_designation: DataTypes.STRING,
    company_name: DataTypes.STRING,
    company_address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_job',
  });
  return user_job;
};