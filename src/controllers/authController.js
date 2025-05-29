const bcrypt = require('bcrypt'); //pra criptografar a senha
const jwt = require('jsonwebtoken'); //gerar token JWT
const User = require('../models/Users') //model do usuário(tabela)

require('dotenv').config({path: 'auth.env'})

const saltRounds = 10; //numero de voltas de hash que o bcrypt vai usar na senha

//função para registrar novo usuário
const register = async (req, res) => {
    try {
        //capturando credenciais obrigatórios para um novo usuário
        const {name, email, password} = req.body;

        //verificar se já existe um usuário com o mesmo e-mail
        const existingUser = await User.findOne({where: {email} })
        if (existingUser) {
            return res.status(400).json({erro: 'Email já cadastrado'})
        }

        //aqui estamos criptografando a senha
        //utilizando await pois está buscando a senha no banco para fazer o hash
        const password_hash = await bcrypt.hash(password, saltRounds);
        
        //criando o usuário no banco
        const newUser = await User.create({
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

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        //buscar o usuário pelo e-mail
        const user = await User.findOne({where: {email}});
        if (!user) {
            return res.status(401).json({email: 'Credenciais Inválidas'});
        }

        //verificando se a senha está correta
        const senhaCorreta = await bcrypt.compare(password, user.password_hash);
        if (!senhaCorreta) {
            return res.status(401).json({error: 'Credenciais Inválidas'})
        }

        //gerar o token JWT
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {expiresIn: '1d'} //token valido por 1 dia
        );

        const {password_hash: _, ...userWithoutPassword} = user.toJSON();
        res.status(200).json({user: userWithoutPassword, token})
    } catch (error) {
        console.error('Erro no login: ', error);
        res.status(500).json({error: 'Erro ao fazer login'});
    }
};

module.exports = {
    register,
    login
};

