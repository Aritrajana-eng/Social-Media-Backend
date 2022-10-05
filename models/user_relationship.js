'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_relationship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_relationship.init({
    user_id: DataTypes.INTEGER,
    related_user_id: DataTypes.INTEGER,
    relationship_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_relationship',
  });
  return user_relationship;
};