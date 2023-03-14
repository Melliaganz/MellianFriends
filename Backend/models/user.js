'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Post);
      models.User.hasMany(models.Comment);
    }
  }
  User.init({
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    password: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
    emailHash: DataTypes.STRING,
    lock_until: DataTypes.STRING,
    login_attempts: DataTypes.INTEGER,
    profilePic: DataTypes.STRING,
    coverPic: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};