const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

const {getUserCart, AddToCart, updateCartItem, removeFromCart} = require('../controllers/cartController');

//rota protegida e retorna o carrinho do usuário atual
// GET /api/cart

router.get('/', verifyToken, getUserCart)

//inserir um produto no carrinho
router.post('/', verifyToken, AddToCart)

//atualizar a quantidade de um produto no carrinho
router.put('/:productId', verifyToken, updateCartItem)

//remover item do carrinho
router.delete('/:productId', verifyToken, removeFromCart)

module.exports = router;