const express = require('express'); // inicializando o servidor express
const sequelize = require('../src/config/database'); //fazendo a conexão do sequelize com nosso arquivo de configuração database
const user = require('../src/models/Users'); // definindo o model do DB que será utilizado, no caso, cada modelo é uma tabela
require('./models/Associations');
const app = express(); //definindo 'app' como o comunicador do servidor express
const PORT = process.env.PORT || 3000; //definindo a porta em que o servidor irá rodar




app.use(express.json()); //middleware para entender JSON com express

//rota de autenticação
const authRoutes = require('./routes/auth.routes');
//definindo um prefixo para o grupo de rotas de autenticação
app.use('/api/auth', authRoutes)

//Rota de produtos
const productRoutes = require('./routes/product.routes')
app.use('/api/products', productRoutes)

const categoryRoutes = require('./routes/category.routes');
app.use('/api/categories', categoryRoutes)

const CartRoutes = require('./routes/cart.routes');
app.use('/api/cart', CartRoutes);

const addressRoutes = require('./routes/address.routes');
app.use('/api/addresses', addressRoutes);

const orderRoutes = require('./routes/order.routes');
app.use('/api/orders', orderRoutes);

const adminRoutes = require('./routes/admin.routes');
app.use('/api/admin', adminRoutes);

const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);
sequelize.sync({alter: true}) //sincronizando o sequelize com o DB. Alter=True serve para o sequelize atualizar o banco toda vez que houver alguma mudança
    .then(() => { //após sincronizar ele executa a resposta da promise. Then é usado para tratar o sucesso de uma promise, pois como o sequelize.sync
        // é assincrono e leva tempo, quando terminar o then vai tratar o sucesso da promise do sync.
        console.log('Banco de dados sincronizado!'); //
        app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`)); //mostrar a porta que o servidor está rodando
    })
    .catch(err => console.error('Erro ao conectar no banco:', err));

