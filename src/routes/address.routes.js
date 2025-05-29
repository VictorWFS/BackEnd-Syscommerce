const express = require('express')
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken')

const {getUserAddresses, addAddress, updateAddress, deleteAddress} = require('../controllers/addressesController')

router.get('/', verifyToken, getUserAddresses);

router.post('/', verifyToken, addAddress);

router.put('/:id', verifyToken, updateAddress);

router.delete('/:id', verifyToken, deleteAddress)

module.exports = router;