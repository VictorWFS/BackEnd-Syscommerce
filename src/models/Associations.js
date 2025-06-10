const User = require('./Users')
const Product = require('./Product')
const OrderItem = require('./OrderItem')
const Order = require('./Order')
const Category = require('./Category')
const CartItem = require('./CartItem')
const Address = require('./Address')

//criando o relacionamento entre produtos -> categorias
Category.hasMany(Product, {foreignKey: 'category_id'});
Product.belongsTo(Category, {foreignKey: 'category_id'});

//criando relacionamento entre usuário -> itens do carrinho
User.hasMany(CartItem, {foreignKey: 'user_id'});
CartItem.belongsTo(User, {foreignKey: 'user_id'});

//criando relacionamento entre produtos -> itens do carrinho
Product.hasMany(CartItem, {foreignKey: 'product_id'});
CartItem.belongsTo(Product, {foreignKey: 'product_id'});

//criando relacionamento entre usuários -> pedidos
User.hasMany(Order, {foreignKey: 'user_id'});
Order.belongsTo(User, {foreignKey: 'user_id'});

//criando o relacionamento entre pedidos - itens do pedido
Order.hasMany(OrderItem, {foreignKey: 'order_id'});
OrderItem.belongsTo(Order, {foreignKey: 'order_id'})

//criando relacionamento entre produto -> itens do pedido
Product.hasMany(OrderItem, {foreignKey: 'product_id'});
OrderItem.belongsTo(Product, {foreignKey: 'product_id'});

//criando relacionamento entre usuário -> endereço
User.hasMany(Address, {foreignKey: 'user_id'});
Address.belongsTo(User, {foreignKey: 'user_id'});

Order.belongsTo(Address, { foreignKey: 'address_id' });
Address.hasMany(Order, { foreignKey: 'address_id' });




module.exports = {
    User,
    Category,
    Product,
    CartItem,
    Order,
    OrderItem,
    Address
};