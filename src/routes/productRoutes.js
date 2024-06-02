const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');

const {getProducts, getOneProduct, createProduct, updateProduct, deleteProduct} = controller;

router.get('/', getProducts);
router.get('/:id', getOneProduct);
router.post('/',createProduct);
router.put('/:id',updateProduct);
router.delete('/:id',deleteProduct);

module.exports = router;