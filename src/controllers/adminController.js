const User = require('../models/Users');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Category = require('../models/Category')

const {Op} = require('sequelize');
console.log('User model:', User);
const getAllUsers = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({error: 'Ação restrita a administradores'})
        }

        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'role', 'createdAt'],
            include: [{
                model: Order,
                attributes: ['id', 'status', 'total_amount', 'createdAt']
            }],
            order: [['createdAt', 'DESC']]
        });

        res.json(users)
    } catch (error) {
        console.error('Erro ao listar usuários', error);
        res.status(500).json({error: 'Erro ao listar usuários'})
    }
};

const getAllProductsAdmin = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({error: 'Ação restrita a administradores'})
        }

        const {
            search,
            category,
            sort = 'createdAt',
            order = 'DESC',
            page = 1,
            limit = 10
        } = req.query

        const where = {};
        if (search) {
            where.name = { [Op.iLike]: `%${search}%`}
        }

        if (category) {
            where.category_id = category;
        }

        const offset = (page - 1) * limit;


        const {rows: products, count: total} = await Product.findAndCountAll({
           where,
           include: [{model: Category, attributes: ['id', 'name']}] ,
           order: [[sort, order]],
           limit: Number(limit),
           offset: Number(offset)
        });

        const totalPages = Math.ceil(total / limit);
        res.json({products, total, totalPages});
    } catch (error) {
        console.error('Erro ao listar produtos admin: ', error);
        res.status(500).json({error: 'Erro ao lista produtos'})
    }
};

const getAllOrdersAdmin = async (req, res) => {
    try {
        //verificando se o usuário tem perfil de admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({error: 'Ação restrita a administradores'})
        }

        const {
            status,
            userId,
            sort = 'createdAt',
            order = 'DESC',
            page = 1,
            limit = 10
        } = req.query;

        
        const where = {} //filtro de busca para o sequelize
        if (status) where.status = status;
        if (userId) where.user_id = userId;

        //organizando os pedidos por paginação
        const offset = (page - 1) * limit;

        //buscando no banco os pedidos e a quantidade de pedidos
        const { rows: orders, count: total} = await Order.findAndCountAll({
            where,
            include: [
                {model: User, attributes: ['id', 'name', 'email']},
                {
                    model: OrderItem,
                    include: [{model: Product, attributes: ['id', 'name', 'price']}]
                }
            ],
            order: [[sort, order]],
            limit: Number(limit),
            offset: Number(offset)
        });

        const totalPages = Math.ceil(total / limit);

        res.json({orders, total, totalPages});

    } catch (error) {
        console.error('Erro ao listar pedidos', error);
        res.status(500).json({error: 'Erro ao listar pedidos'});
    }
};

module.exports = {
    getAllUsers,
    getAllProductsAdmin,
    getAllOrdersAdmin
}