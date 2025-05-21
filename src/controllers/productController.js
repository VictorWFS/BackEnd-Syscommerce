const {Op} = require('sequelize');
const Product = require('../models/Product')
const Category = require('../models/Category');

const getAllProducts = async (req, res) => {
    try {
        //filtros para acessar os parâmetros da URL
        const {
            category,
            search,
            sort = 'createdAt',
            order = 'desc',
            limit = 10,
            page = 1 //ordenando conforme data de criação
        } = req.query;

        const where = {}

        //filtrando por categoria
        if (category) {
            where.category_id = category;
        }

        //filtrando por termo de busca no nome ou descrição
        if (search) {
            where[Op.or] = [
                { name : {[Op.iLike]: `%${search}%`} },
                { description: {[Op.like]: `%${search}%`}}
            ];
        }

        const offSet = (page - 1) * limit;

        //consulta com filtros, ordenação e categoria incluída
        const {rows: products, count: total} = await Product.findAndCountAll({
            where,
            include: [{model: Category, attributes: ['id', 'name']}],
            order: [[sort, order]],
            limit: Number(limit),
            offset: Number(offset)
        });


    } catch (error) {
        
    }
}