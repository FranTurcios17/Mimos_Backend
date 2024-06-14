const db = require('../../models');


// Crear un nuevo pedido
const createOrder = async (req, res) => {
  const { userId, totalPrice, status, deliveryDate, deliveryAdress,payMethod, items} = req.body;

  const trs = await db.sequelize.transaction();
  try {
    const newOrder = await db.Order.create({ userId, totalPrice, status, deliveryDate, payMethod, deliveryAdress }, {transaction: trs});

    const orderItems = items.map(item => ({
      orderId: newOrder.id,
      productId: item.productId,
      finalPrice: item.finalPrice,
      quantity: item.quantity,
      subtotal: item.subtotal
    }));

    await db.OrderItem.bulkCreate(orderItems, {transaction: trs});
    await trs.commit();
    res.status(201).json(newOrder);
  } catch (error) {
    trs.rollback();
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los pedidos de un usuario
const getOrdersByUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const orders = await db.Order.findAll({
      where: { userId },
      attributes: {exclude: ['updatedAt']},
      include: [
        {
          model: db.OrderItem,
          attributes: {exclude: ['id','orderId','createdAt', 'updatedAt']},
          include: [{
            model: db.Product,
            attributes: ['code','description', 'price']
          }]
        }
      ]
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener detalles de un pedido específico
const getOrderById = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await db.Order.findOne({
      where: { id: orderId },
      include: [
        {
          model: db.OrderItem,
          attributes: {exclude: ['id','orderId','createdAt', 'updatedAt']},
          include: [{
            model: db.Product,
            attributes: ['code','description', 'price']
          }]
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllOrders = async(req, res) =>
{
  try {
    const orders = await db.Order.findAll({
      attributes: {exclude: ['updatedAt']},
      include: [        
        {
          model: db.OrderItem,
          attributes: {exclude: ['id','orderId','createdAt', 'updatedAt']},
          include: [{
            model: db.Product,
            attributes: ['code','description', 'price']
          }]
        }
        
      ]
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  const transaction = await db.sequelize.transaction();
  

  try {
    // Encontrar la orden
    const order = await db.Order.findByPk(orderId);
    if (!order) {
      
      return res.status(404).json({ error: 'Order not found' });
    }

    const orId = orderId;

    
    await db.OrderItem.destroy({ where: { orderId: orId }, transaction });

    
    await order.destroy({ transaction });

    
    await transaction.commit();

    return res.status(204).json({ message: 'Order deleted successfully' });
  } catch (error) {
    
    await transaction.rollback();
    console.error('Error deleting order:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports = {createOrder, getOrdersByUser, getOrderById, getAllOrders, deleteOrder};