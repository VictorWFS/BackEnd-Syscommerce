const multer = require('multer');
const path = require('path');

//configuração de armazenamento
const storage = multer.diskStorage({
    destination: (req,file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}-${file.fieldname}${ext}`;
        cb(null. filename);
    }
});

//filtro para aceitar apenas imagens
//função para validar o tipo de arquivo que está sendo enviado
const fileFilter = (req, res, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de arquivo não suportado'), false);
    }
};

const upload = multer({storage, fileFilter});

module.exports = upload;