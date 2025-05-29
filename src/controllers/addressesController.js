const Address = require('../models/Address');

//retorna os endereços do usuário logado

const getUserAddresses = async (req, res) => {
    try {
        const userId = req.user.id;

        const addresses = await Address.findAll({
            where: {user_id: userId},
            order: [['createdAt', 'DESC']]
        });

        res.json(addresses)
    } catch (error) {
        console.error('Erro ao buscar endereços: ', error);
        res.status(500).json({error: 'Erro ao buscar endereços'})
    }
};

const addAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const {street, city, state, zip_code} = req.body;

        if (!street || !city || !state || !zip_code) {
            return res.status(400).json({error: 'Todos os campos são obrigatórios'});
        }

        const newAddress = await Address.create({
            user_id:  userId,
            street,
            city,
            state,
            zip_code
        });

        res.status(201).json({message: 'Endereço adicionado com sucesso', address: newAddress})
    } catch (error) {
        console.error('Erro ao adicionar endereço', error);
        res.status(500).json({error: 'Erro ao adicionar endereço'});
    }
};

const updateAddress = async (req, res) => {
    try {
        const userId = req.user.id
        const addressId = parseInt(req.params.id, 10);
        const {street, city, state, zip_code} = req.body;

        const address = await Address.findOnde({
            where: {id: addressId, user_id: userId}
        });

        if (!address) {
            return res.status(404).json({error: 'Endereço não encontrado'})
        }

        address.street = street || address.street;
        address.city = city || address.city;
        address.state = state || address.state;
        address.zip_code = zip_code || address.zip_code;


        await address.save();

        res.json({message: 'Endereço atualizado com sucesso', address})

    } catch (error) {
        console.error('Erro ao atualizar o endereço', error);
        res.status(500).json({error: 'Erro ao atualizar endereço'});   
    }
};

const deleteAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const addressId = parseInt(req.params.id, 10);

        const address = await Address.findOne({
            where: {id: addressId, user_id: userId}
        });

        if(!address){
            return res.status(404).json({error: 'Endereço não encontrado'})
        }

        await address.destroy();
        res.json({message: 'Endereço removido com sucesso'});
    } catch (error) {
        console.error('Erro ao remover o endereço', error);
        res.status(500).json({error: 'Erro ao remover endereço'});
    }
};

module.exports = {
    getUserAddresses,
    addAddress,
    updateAddress,
    deleteAddress
}