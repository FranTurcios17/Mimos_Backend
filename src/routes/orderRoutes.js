const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.createOrder);
router.get('/user/:userId', orderController.getOrdersByUser);
router.get('/:orderId', orderController.getOrderById);
router.get('/', orderController.getAllOrders);
router.delete('/:orderId', orderController.deleteOrder);

module.exports = router;