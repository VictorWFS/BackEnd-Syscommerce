const {DataTypes} = require('sequelize')
const sequelize = require('../config/database')

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'pending'
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    shipping_address: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},{
    tableName: 'orders',
    timestamps: true
});

module.exports = Order;