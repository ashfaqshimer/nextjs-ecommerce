const express = require('express');
const { getCart, updateCart, deleteCartItem } = require('../controllers/cart');

const router = express.Router();

router.get('/:userId', getCart);
router.put('/:id', updateCart);
router.delete('/:id', deleteCartItem);

module.exports = router;
