const express = require('express');
const router = express.Router();

const {getAllCategories, createCategory, updateCategory, deleteteCategory} = require('../controllers/categoryController');
const verifyToken = require('../middlewares/verifyToken');

//rota pública para listar as categorias
router.get('/', getAllCategories);

router.post('/', verifyToken, createCategory);

router.put('/:id', verifyToken, updateCategory);

router.delete('/:id', verifyToken, deleteteCategory);

module.exports = router;