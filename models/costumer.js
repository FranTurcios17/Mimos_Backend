'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Costumer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Costumer.init({
    id_number: DataTypes.STRING,
    full_name: DataTypes.STRING,
    phone: DataTypes.STRING,
    adress: DataTypes.STRING,
    id_user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Costumer',
  });
  return Costumer;
};