const express = require('express');
const router = express.Router();

const categoriesService = require('../app/services/CategoryService');
const { verifyToken } = require('../app/middlewares/authMiddlewares');

router.get('/category_5/:category_4_id', categoriesService.getAllCategory5);
router.get('/category_4/:category_3_id', categoriesService.getAllCategory4);
router.get('/category_3/:category_2_id', categoriesService.getAllCategory3);
router.get('/category_2/:category_1_id', categoriesService.getAllCategory2);
router.get('/category_1', categoriesService.getAllCategory1);

module.exports = router;
