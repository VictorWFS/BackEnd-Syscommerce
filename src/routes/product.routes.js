const express = require('express')

const router = express.Router();

//importando o controller com a lógica(função) da rota
const {getAllProducts} = require('../controllers/productController');

//rota pública para listar todos os produtos com filtros, busca e paginação
router.get('/', getAllProducts)


//exporta esse roteador para ser usado no app.js
module.exports = router;