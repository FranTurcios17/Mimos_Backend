'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderItem.init({
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    finalPrice: DataTypes.DECIMAL(10,2),
    quantity: DataTypes.INTEGER,
    subtotal: DataTypes.DECIMAL(10,2)
  }, {
    sequelize,
    modelName: 'OrderItem',
  });
  return OrderItem;
};