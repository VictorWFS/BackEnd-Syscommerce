const express = require('express');
const router = express.Router();

const {getAllCategories} = require('../controllers/categoryController');

//rota pública para listar as categorias
router.get('/', getAllCategories)

module.exports = router;