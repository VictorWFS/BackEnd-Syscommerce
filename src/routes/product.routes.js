const express = require('express')
const upload = require('../middlewares/upload')
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken')

//importando o controller com a lógica(função) da rota
const {getAllProducts, deleteProduct, updateProduct} = require('../controllers/productController');
const { verify } = require('jsonwebtoken');

//rota pública para listar todos os produtos com filtros, busca e paginação
router.get('/', verifyToken, getAllProducts)

router.post('/:id/image', verifyToken, upload.single('image'), uploadProductImage)

router.put('/:id', verifyToken, updateProduct)

router.delete('/:id', verifyToken, deleteProduct)

//exporta esse roteador para ser usado no app.js
module.exports = router;