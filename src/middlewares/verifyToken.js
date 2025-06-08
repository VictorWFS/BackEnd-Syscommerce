const jwt = require('jsonwebtoken');

//carregando o JWT_SECRET do .env
require('dotenv').config({path: 'auth.env'});


const verifyToken = (req, res, next) => {
    //é o autorizador que o jwt utiliza no cabeçalho de requisições http
    const authHeader = req.headers.authorization;

    //verifica se o header realmente existe e começa com o "bearer"
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({error: 'Token não fornecido'})
    }

    //extraindo o token e removendo o bearer
    //o token fica armazenado na segunda posição do cabeçalho authHeader
    const token = authHeader.split(' ')[1];
    try {
        //verifica e decodifica o token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //adiciona o usuário decodificado na requisição
        req.user = decoded;

        next()
    } catch (error) {
        return res.status(401).json({error: 'Token inválido ou expirado'});
    }
};

module.exports = verifyToken;