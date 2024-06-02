'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    code: DataTypes.STRING,
    description: DataTypes.STRING,
    url_image: DataTypes.STRING,
    price: DataTypes.STRING,
    tax: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};