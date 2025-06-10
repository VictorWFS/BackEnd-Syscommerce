const {DataTypes} = require('sequelize')
const sequelize = require('../config/database')

const OrderItem = sequelize.define('OrderItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },
    unit_price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        validate: {
            min: 0
        }
    }
}, {
    tableName: 'order_items',
    createdAt: 'created_at',
    updateAt: false
});

module.exports = OrderItem;