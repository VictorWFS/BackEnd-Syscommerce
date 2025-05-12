const {DataTypes} = require('sequelize')

const sequelize = require('../config/database')

const CartItem = sequelize.define('CartItems', {
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
    }
}, {
    tableName: 'cart_items',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'product_id']
        }
    ]
});

module.exports = CartItem;