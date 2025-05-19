const express = require('express');
const router = express.Router(); //separar rotas por funcionalidade(auth,produtos,categ)

//importar as funções do authController.js

//usamos chaves pois queremos acessar valores/funções do authcontroller
const {register, login} = require('../controllers/authController');

//rota de registro
// POST /api/auth/register
router.post('/register', register);

//Rota de login
// POST /api/auth/login

router.post('/login', login);


moduler.exports = router;