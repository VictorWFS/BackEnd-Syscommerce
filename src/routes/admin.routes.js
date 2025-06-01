const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const {getAllUsers, getAllProductsAdmin, getAllOrdersAdmin} = require('../controllers/adminController');

router.get('/users', verifyToken, getAllUsers);

router.get('/products', verifyToken, getAllProductsAdmin);

router.get('/orders', verifyToken, getAllOrdersAdmin);


module.exports = router;