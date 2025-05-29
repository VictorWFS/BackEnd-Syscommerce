const {Sequelize} = require('sequelize'); //importando a
//principal classe do sequelize para fazer a conexão com o banco

require('dotenv').config({path: 'db.env'});//pegue as variáveis que estão no arquivo .env
//para dentro do meu projeto
console.log('Senha:', process.env.DB_PASSWORD, '| Tipo:', typeof process.env.DB_PASSWORD);

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false
});

module.exports = sequelize;