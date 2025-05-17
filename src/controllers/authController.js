const bcrypt = require('bcrypt'); //pra criptografar a senha
const jwt = require('jsonwebtoken'); //gerar token JWT
const User = require('../models/Users') //model do usuário(tabela)

require('dotenv').config({path: 'auth.env'})

const saltRounds = 10; //numero de voltas de hash que o bcrypt vai usar na senha

const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        //verificar se já existe um usuário com o mesmo e-mail
        const existingUser = await User.findOne({where: {email} })
        if (existingUser) {
            return res.status(400).json({erro: 'Email já cadastrado'})
        }

        //aqui estamos criptografando a senha
        const password_hash = await bcrypt.hash(password, saltRounds);
        
        //criando o usuário no banco
        const newUser = User.create({
            name,
            email,
            password_hash,
            role: 'customer'
        })

        //retornando o usuário sem a senha
        const {password_hash: _, ...userWithoutPassword} = newUser.toJSON();
        res.status(201).json(userWithoutPassword);

    } catch (error) {
        console.error('Erro no register:', error);
        res.status(500).json({erro: 'Erro ao registrar usuário'})
    }
};

// ================ login ===================

//continuar aqui, o login

