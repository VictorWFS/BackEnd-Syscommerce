const {Op} = require('sequelize');
const Product = require('../models/Product')
const Category = require('../models/Category');
const upload = require('../middlewares/upload');

const getAllProducts = async (req, res) => {
    try {
        //filtros para acessar os parâmetros da URL
        const {
            category,
            search,
            sort = 'createdAt', //ordenando conforme data de criação
            order = 'desc'
        } = req.query;

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const offSet = (page - 1) * limit;

        const where = {};

        //filtrando por categoria
        if (category) {
            where.category_id = category;
        }

        //filtrando por termo de busca no nome ou descrição
        if (search) {
            where[Op.or] = [
                { name : {[Op.iLike]: `%${search}%`} },
                { description: {[Op.like]: `%${search}%`}}
            ];
        }
        
        
        //calcula a quantidade de produtos que serao mostrados por pagina
        

        //consulta com filtros, ordenação e categoria incluída
        const {rows: products, count: total} = await Product.findAndCountAll({
            where,
            include: [{model: Category, attributes: ['id', 'name']}],
            order: [[sort, order]],
            limit,
            offSet
        });

        //calculando o total de páginas e arredondando com o math.ceil()
        const totalPages = Math.ceil(total / limit);

        res.json({products, total, page, totalPages})



    } catch (error) {
        console.error('Erro ao buscar produtos', error);
        res.status(500).json({error: 'Erro ao buscar produto'});
    }
};

const getProductById = async (req, res) => {
    try {
        //captura do parâmetro id no corpo da req, passando para int
    const id = parseInt(req.params.id, 10);
    console.log('🟡 ID recebido:', req.params.id, '| Após parseInt:', id);

    
    //verificando se o ID é, de fato, um número
    if (isNaN(id)) {
        return res.status(400).json({erro: 'ID inválido'})
    };

    const product = await Product.findByPk(id, {
        include: [{model: Category, attributes: ['id', 'name']}]
    });

    if (!product) {
        return res.status(400).json({erro: 'Produto não encontrado'})
    };

    res.json(product);

    } catch (error) {
        console.error('Erro ao buscar produto', error);
        res.status(500).json({error: 'Erro ao buscar produto'})
    }
    
};

const createProduct = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({error: 'Ação restrita a administradores'});
        }
        const {
            name,
            description,
            price,
            stock,
            image_url,
            category_id
        } = req.body;

        if (!name || !price || !stock || !category_id) {
            return res.status(400).json({error: 'Campos obrigatórios: name, price, stock, category_id'})
        }

        const newProduct = await Product.create({
            name,
            description,
            price,
            stock,
            image_url,
            category_id
        });

        res.status(201).json({
            message: 'Produto criado com sucesso!',
            product: newProduct
        });
    } catch (error) {
        console.error('Erro ao criar produto', error);
        res.status(500).json({error: 'Erro ao criar produto'});
    }
};

const uploadProductImage = async (req, res) => {
    try {
        if (res.user.role !== 'admin') {
            return res.status(403).json({error: 'Ação restrita apenas a administradores'})
        }

        const produtcId = parseInt(req.params.id, 10);
        const product = await Product.findByPk(produtcId);

        if (!product) {
            return res.status(404).json({error: 'Produto não encontrado'});
        }

        if (!req.file) {
            return res.status(400).json({error: 'Nenhum arquivo enviado'});
        }
        product.image_url = req.file.filename;
        await product.save();

        res.status(200).json({message: 'Imagem adicionada com sucesso', image_url: product.image_url});
    } catch (error) {
        console.error('Erro ao fazer upload da imagem', error);
        res.status(500).json({error: 'Erro ao fazer upload da imagem'})
    }
};

const updateProduct = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({error: 'Ação restrita somente a administradores'})
        }

        const productId = parseInt(req.params.id, 10);
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({error: 'Produto não encontrado'});
        }

        const {
            name,
            description,
            price,
            stock,
            category_id
        } = req.body;

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price !== undefined ? price : product.price;
        product.stock = stock !== undefined ?stock: product.stock;
        product.category_id = category_id || product.category_id;

        await product.save();

        res.json({message: 'Produto atualizado com sucesso', product});
    } catch (error) {
        console.error('Erro ao atualizar produto', error);
        res.status(500).json({error: 'Erro ao atualizar produto'});
    }
}

const deleteProduct = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({error: 'Ação restrita somente a administradores'})
        }

        const productId = parseInt(req.params.id, 10);
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({error: 'Produto não encontrado'})
        }

        await product.destroy();

        res.json({message: 'Produto deletado com sucesso'})
    } catch (error) {
        console.error('Erro ao deletar o produto', error);
        res.status(500).json({error: 'Erro ao deletar o produto'})
    }
};

module.exports = { 
    getAllProducts,
    uploadProductImage,
    updateProduct,
    deleteProduct,
    getProductById,
    createProduct
};