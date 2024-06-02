'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BCostumer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BCostumer.init({
    id_number: DataTypes.STRING,
    rtn: DataTypes.STRING,
    full_name: DataTypes.STRING,
    b_name: DataTypes.STRING,
    phone: DataTypes.STRING,
    b_phone: DataTypes.STRING,
    adress: DataTypes.STRING,
    id_user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BCostumer',
  });
  return BCostumer;
};