const {DataTypes} = require('sequelize')
const sequelize = require('../config/database')

const Address = sequelize.define('Address', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    street: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    number: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    complement: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    neighborhood: {
        type: DataTypes.STRING(50),
        allowNull: false
    }, 
    city: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    state: {
        type: DataTypes.STRING(2),
        allowNull: false
    },
    postal_code: {
        type: DataTypes.STRING(9),
        allowNull: false
    },
    is_default: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'addresses',
    timestamps: true
});

module.exports = Address;