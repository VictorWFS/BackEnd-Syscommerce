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

const createCategory = async (req,res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({error: 'Ação restrita a administradores'})
        }

        const {name} = req.body;
        const category = await Category.create({name});

        res.status(201).json({message: 'Categoria criada com sucesso', category})
    } catch (error) {
        console.error('Erro ao criar categoria', error);
        res.status(500).json({error: 'Erro ao criar categoria'});
    }
};

const updateCategory = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({error: 'Ação restrita a administradores'})
        }

        const categoryId = parseInt(req.params.id, 10)
        const {name} = req.body;
        const category = await Category.findByPk(categoryId);

        if (!category) {
            return res.status(404).json({error: 'Categoria não encontrada'})
        }

        category.name = name || category.name;
        await category.save();

        res.json({message: 'Categoria atualizada com sucesso', category})
    } catch (error) {
        console.error('Erro ao atualizar categoria');
        res.status(500).json({error: 'Erro ao atualizar categoria'});
    }
}

const deleteteCategory = async(req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({error: 'Ação restrita a administradores'})
        }

        const categoryId = parseInt(req.params.id, 10);
        const category = await Category.findByPk(categoryId)

        if (!category) {
            return res.status(404).json({error: 'Categoria não encontrada'})
        }

        await category.destroy();

        req.json({message: 'Categoria deletada com sucesso'});
    } catch (error) {
        console.error('Erro ao deletar categoria');
        res.status(500).json({error: 'Erro ao deletar categoria'})
    }
};

module.exports = {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteteCategory
};