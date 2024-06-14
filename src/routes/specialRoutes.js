const express = require('express');
const router = express.Router();
const specialPriceController = require('../controllers/specialController');

router.post('/', specialPriceController.createSpecialPrice);
router.post('/bulk', specialPriceController.createSpecialPrices);
router.get('/user/:businessCustomerId', specialPriceController.getSpecialPricesByBusinessCustomer);


module.exports = router;
