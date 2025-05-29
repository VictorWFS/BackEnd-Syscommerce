const Category = require('../models/Category')

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            attributes: ['id', 'name'],
            order: [['name', 'ASC']]
            //capturando apenas o id e nome da categoria e colocando
            //em ordem ascendente
        });

        res.json(categories)
    } catch (error) {
        console.error('Erro ao buscar categorias: ', error);
        return res.status(500).json({error: 'Erro ao buscar categorias'})
    }
};

module.exports = {
    getAllCategories
};