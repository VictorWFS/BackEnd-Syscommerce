const CartItem = require('../models/CartItem');
const product = require('../models/Product');
const category = require('../models/Category');
const Product = require('../models/Product');

//retorna os itens do carrinho do usuário atual autenticado
const getUserCart = async (req, res) => {
    try {
        const userId = req.user.id; //vem do token decodificado pelo middleware

        const cartItems = await CartItem.findAll({
            where: {user_id: userId},
            include: [{ //include significa JOIN em SQL
                model: Product, //definindo qual tabela será feita o join
                attributes: ['id', 'name', 'price', 'image_url'],
                include: { //definindo outra tabela para fazer join
                    model: category,
                    attributes: ['id', 'name']
                }
            }],
            order: [['createdAt', 'DESC']]
        });

        res.json(cartItems)
    } catch (error) {
        console.error('Erro ao buscar carrinho do usuário:', error);
        res.status(500).json({error: 'Erro ao buscar carrinho'});
    }
};

const AddToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const {product_id, quantity} = req.body;

        //validando os dados da requisição
        if (!product_id || !quantity || quantity <= 0) {
            return res.status(400).json({error: 'Dados inválidos'});
        }

        //verificando se o produto existe
       const product = await Product.findByPk(product_id);
       if (!product) {
        return res.status(400).json({error: 'Produto não encontrado'});
       }

       //verificando se o item já existe no carrinho
       const existingItem = await CartItem.findOne({
        where: {user_id: userId, product_id}
       })

       if (existingItem) {
            //se o item já existe, é somado a quantidade existente no carrinho
            existingItem.quantity += quantity;
            await existingItem.save();
            return res.status(200).json({message: 'Quantidade atualizada no carrinho', item: existingItem})
       }

       //caso não exista, é criado um novo item no carrinho
       const newItem = await CartItem.create({
        user_id: userId,
        product_id,
        quantity
       });

       res.status(201).json({message: 'Produto adicionado ao carrinho', item: newItem})

    } catch (error) {
        console.error('Erro ao adicionar ao carrinho', error);
        res.status(500).json({error: 'Erro ao adicionar ao carrinho'});  
    }
};

const updateCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = parseInt(req.params.productId, 10);
        const {quantity} = req.body;

        if (!quantity || quantity <= 0) {
            return res.status(400).json({error: 'Quantidade inválida'})
        }

        const item = await CartItem.findOne({
            where: {user_id: userId, product_id: productId}
        })

        if (!item) {
            return res.status(404).json({error: 'Item não encontrado no carrinho'})
        }

        item.quantity = quantity
        await item.save();

        res.json({message: 'Quantidade atualizada com sucesso', item})
    } catch (error) {
        console.error('Erro ao atualizar item do carrinho:', error);
        res.status(500).json({error: 'Erro ao atualizar item do carrinho'});
        
    }
};

const removeFromCart = async (req, res) => {
    try {
        const UserId = req.user.id;
        const productId = parseInt(req.params.productId, 10);

        //verificando se o item existe para fazer o delete
        const item = await CartItem.findOne({
            where: {user_id: userId, product_id: productId}
        });
        //condicional para fazer a verificação
        if (!item) {
            return res.status(404).json({error: 'Não foi possivel localizar o item no carrinho'})
        }

        //destroy() é um comando do sequelize que deleta um determinado item da coluna sql
        await item.destroy();
        res.json({message: 'Item removido do carrinho com sucesso'});




    } catch (error) {
        console.error('Erro ao remover item do carrinho:', error);
        res.status(500).json({error: 'Erro ao remover item do carrinho'});
    }
}

module.exports = {
    getUserCart,
    AddToCart,
    updateCartItem,
    removeFromCart
};