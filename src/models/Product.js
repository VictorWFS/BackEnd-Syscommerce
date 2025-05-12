const {DataTypes} = require('sequelize')
const sequelize = require('../config/database')

const Product = sequelize.define('Product', {
    //coluna de id do produto
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    //coluna de nome do produto
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    //coluna de descrição do produto
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0.01
        }
    },
    stock_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'products',
    timestamps: true
});

module.exports = Product;