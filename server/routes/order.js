const express = require('express');
const {
	createOrder,
	getOrders,
	updateOrder,
	deleteOrder,
} = require('../controllers/order');

const advancedResults = require('../middleware/advancedResults');
const Order = require('../models/Order');

const router = express.Router();

router
	.route('/')
	.get(advancedResults(Order, { path: 'user', select: '_id name' }), getOrders)
	.post(createOrder);
router.route('/:id').put(updateOrder).delete(deleteOrder);

module.exports = router;
