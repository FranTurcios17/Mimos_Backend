const db = require('../../models');

// Crear un nuevo precio especial
const createSpecialPrice = async (req, res) => {
  const { id_client, id_product, sp_price } = req.body;

  try {
    const newSpecialPrice = await db.SpecialPrice.create({ id_client, id_product, sp_price });
    res.status(201).json(newSpecialPrice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSpecialPrices = async (req, res) => {
  const special_prices = req.body.special_prices;

  try {
    // Usar bulkCreate para insertar múltiples precios especiales
    const newSpecialPrices = await db.SpecialPrice.bulkCreate(special_prices, {
      validate: true
    });

    res.status(201).json(newSpecialPrices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener precios especiales para un cliente empresarial
const getSpecialPricesByBusinessCustomer = async (req, res) => {
  const businessCustomerId = req.params.businessCustomerId;
  try {
    const specialPrices = await db.SpecialPrice.findAll({
      where: { id_client: businessCustomerId },
      attributes: ['id_client', 'id_product', 'sp_price'],
      include: [
        {
          model: db.Product,
          attributes: ['code', 'description', 'price']
        }
      ]
    });
    res.status(200).json(specialPrices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {createSpecialPrice, getSpecialPricesByBusinessCustomer, createSpecialPrices};