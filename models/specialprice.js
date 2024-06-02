'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpecialPrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SpecialPrice.init({
    sp_price: DataTypes.STRING,
    id_product: DataTypes.INTEGER,
    id_client: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SpecialPrice',
  });
  return SpecialPrice;
};