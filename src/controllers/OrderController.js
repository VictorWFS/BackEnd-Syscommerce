const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
const Address = require('../models/Address');

const createOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const address_id = req.body.address_id;


        //verificando se o endereço existe e pertence ao usuário atual
        const address = await Address.findOne({
            where: {id: address_id, user_id: userId}
        })
        if (!address) {
            return res.status(400).json({error: 'Endereço inválido'})
        }

        //busca os itens do carrinho
        const cartItems = await CartItem.findAll({
            where: {user_id: userId},
            include: [{model: Product}]
        });

        console.log(cartItems);
        
        //verifica se o carrinho está vazio
        if (cartItems.length === 0) {
            return res.status(400).json({error: 'Carrinho vazio'})
        };

        //calculando o valor total do pedido
        let total = 0;
        const orderItems = [];

        for (const item of cartItems) {
            if (!item.Product || isNaN(parseFloat(item.Product.price))) {
                return res.status(400).json({ error: `Produto com ID ${item.product_id} não encontrado` });
            }

            const price = parseFloat(item.Product.price);
            const subtotal = item.quantity * price
            total += subtotal;

            orderItems.push({
                order_id: null,
                product_id: item.Product.id,
                quantity: item.quantity,
                unit_price: parseFloat(item.Product.price)
            });
        }

        const fullAddress = `${address.street}, ${address.number} - ${address.neighborhood}, ${address.city} - ${address.state}, ${address.postal_code} `

        //criando o pedido
        const order = await Order.create({
            user_id: userId,
            shipping_address: fullAddress,
            total_amount: total
        });

        const orderItemsWithId = orderItems.map(item => ({
            ...item,
            order_id: order.id
        }));

        //criando os itens do pedido
        await OrderItem.bulkCreate(orderItemsWithId, { validate: true });

        

        await CartItem.destroy({where: {user_id: userId}})

        res.status(201).json({
            message: 'Pedido realizado com sucesso',
            order_id: order.id,
            total,
            items: orderItemsWithId
        });

    } catch (error) {
        console.error('Erro ao criar pedido', error);
        res.status(500).json({error: 'Erro ao criar pedido'});
    }
};

const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const orders = await Order.findAll({
            where: {user_id: userId},
            order: [['createdAt','DESC']],
            include: [
                {
                    model: Address,
                    attributes: ['street', 'city', 'state', 'postal_code']
                },
                {
                    model: OrderItem,
                    include: {
                        model: Product,
                        attributes: ['name', 'price', 'image_url']
                    }
                }
            ]
        });

        res.json(orders);

    } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        res.status(500).json({error: 'Erro ao buscar pedidos'})
    }
};

const getOrderById = async (req, res) => {
    try {
        const orderId = parseInt(req.params.id, 10)
        const userId = req.user.id;
        const userRole = req.user.role;

        const order = await Order.findByPk(orderId, {
            include: [
                {
                    model: OrderItem,
                    include: [
                        {
                            model: Product,
                            attributes: ['id', 'name', 'price', 'image_url'],
                            include: {
                                model: Category,
                                attributes: ['id', 'name']
                            }
                        }
                    ]
                }
            ]
        });

        if (!order) {
            return res.status(404).json({error: 'Pedido não encontrado'})
        };

        //verifica se o pedido é do usuario ou vindo do admin
        if (order.user_id !== userId && userRole !== 'admin') {
            return res.status(403).json({error: 'Acesso não autorizado'})
        }

        res.json(order);

    } catch (error) {
        console.error('Erro ao buscar pedido', error);
        res.status(500).json({error: 'Erro ao buscar pedido'});
    }
};

const getAllOrders = async (req, res) => {
    try {
        //verificando se o usuário autenticado é administrador
        if(req.user.role !== 'admin') {
            return res.status(403).json({error: 'Acesso restrito a administradores'})
        }

        //consultando todos os pedidos dentro do banco
        const orders = await Order.findAll({
            include: [
                {
                    model: UserActivation,
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: OrderItem,
                    include: [
                        {
                            model: Product,
                            attributes: ['id', 'name',  'price'],
                            include: {
                                model: Category,
                                attributes: ['id', 'name']
                            }
                        }
                    ]
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.json(orders);
    } catch (error) {
        console.error('Erro ao buscar todos os pedidos: ', error);
        res.status(500).json({error: 'Erro ao buscar pedidos'});
    }
}

module.exports = {
    createOrder,
    getUserOrders,
    getOrderById,
    getAllOrders
}