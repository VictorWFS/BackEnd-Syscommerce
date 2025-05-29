const express = require('express')
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken')
const {createOrder, getUserOrders, getOrderById, getAllOrders} = require('../controllers/OrderController');
const { verify } = require('jsonwebtoken');

router.post('/', verifyToken, createOrder);

router.get('/', verifyToken, getUserOrders);

router.get('/:id', verifyToken, getOrderById);

router.get('/', verifyToken, getAllOrders)
module.exports = router;