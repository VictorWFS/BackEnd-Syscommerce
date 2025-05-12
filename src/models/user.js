const {DataTypes} = require('sequelize'); 
//importando datatypes para definir os tipos das colunas na nossa tabela
const sequelize = require('../config/database');
//importando o arquivo .js configurador do database

//definindo o Model User(tabela de usuários)
const user = sequelize.define('User', { //definindo o modelo user, nossa tabela de users
    name: { 
        type: DataTypes.STRING(100), //definir o tipo de dado da coluna "name" da tabela
        allowNull: false //não permite que o campo esteja vazio
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true //não pode haver dois e-mails iguais
    },
    password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    role: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'customer' //valor padrão de usuário
    }
}, {
    tableName: 'users', //passando o nome da tabela 
    timestamps: true //setando automaticamente o createdAT e updatedAt
});

module.exports = User;

