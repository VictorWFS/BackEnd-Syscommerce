const {DataTypes} = require('sequelize'); //importando a classe DataTypes do sequelize
// pois é nela que está armazenado todos os tipos de dados que serão criados nas tabelas SQL

const sequelize = require('../config/database'); //conectando o sequelize no model category diretamente no arquivo database



//criação da tabela de categorias
//sequelize.define, serve para definir o model "Category" com os campos e tipos esperados
//não colocamos o campo de "id", pois o próprio sequelize.define põe um campo de id automaticamente na coluna
const category = sequelize.define('category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'categories', //nome da tabela
    timestamps: true //timestamp automatico pelo proprio sequelize
});

module.exports = category;
