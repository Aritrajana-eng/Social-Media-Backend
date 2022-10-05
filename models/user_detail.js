'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_detail.hasMany(models.USER_CREDENTIAL, { foreignKey: 'user_id' })
    }
  }
  user_detail.init({
    first_name: DataTypes.STRING,
    middle_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    date_of_birth: DataTypes.DATE,
    bio: DataTypes.STRING,
    address: DataTypes.STRING,
    profile_pic: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'user_detail',
    paranoid: true
  });
  return user_detail;
};