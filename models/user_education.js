'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_education extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_education.init({
    from_year: DataTypes.DATE,
    to_year: DataTypes.DATE,
    user_id: DataTypes.INTEGER,
    degree_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_education',
  });
  return user_education;
};