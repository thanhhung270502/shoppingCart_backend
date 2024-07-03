const express = require('express');
const router = express.Router();

const productService = require('../app/services/ProductService');
const { verifyToken } = require('../app/middlewares/authMiddlewares');
const { belongToShop } = require('../app/middlewares/authShop');

router.get('/:shop_id', verifyToken, belongToShop, productService.getAllProductsByShopId);

module.exports = router;
