const express = require('express');
const { getCarts, postCarts, deleteCart } = require('../controllers/cartsController');

const router = express.Router();

router.get('/', getCarts);
router.post('/', postCarts);
router.delete('/:id', deleteCart);

module.exports = router;