const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const sendEmail = require('../utils/sendEmail');

// @desc    Create order
// @route   POST /api/v1/order
// @access  Public
exports.createOrder = asyncHandler(async (req, res, next) => {
	const { token, amount, user } = req.body;
	console.log(req.body);

	const body = { source: token.id, amount, currency: 'usd' };

	// Calculate order amount
	const userCart = await Cart.findOne({ user: user._id }).populate(
		'products.product'
	);

	const cartTotal = userCart.products
		.reduce((acc, product) => {
			acc += product.quantity * product.product.price;
			return acc;
		}, 0)
		.toFixed(2);

	const stripeResponse = await stripe.charges.create(body);

	const orderInfo = {
		user: user._id,
		amount: cartTotal,
		status: 'paid',
		products: userCart.products,
	};
	const newOrder = await Order.create(orderInfo);

	// Send an email
	const message = `Your order has been confirmed with id "${newOrder._id}". Your order will be shipped out soon.`;

	try {
		await sendEmail({
			email: user.email,
			subject: 'Order Confirmation',
			message,
		});
	} catch (err) {
		console.error(err);
	}
	// Clear user cart
	userCart.products = [];
	await userCart.save();

	res.status(201).json({
		success: true,
		data: 'newOrder',
	});
});

// @desc    Get all orders
// @route   GET /api/v1/order
// @access  Public
exports.getOrders = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedResults);
});

// @desc    Update order
// @route   PUT /api/v1/order/:id
// @access  Public
exports.updateOrder = asyncHandler(async (req, res, next) => {
	const { status } = req.body;

	let order = await Order.findById(req.params.id).populate('user');
	const userEmail = order.user.email;

	if (!order) {
		return next(
			new ErrorResponse(`Order not found with id of ${req.params.id}`, 404)
		);
	}

	order = await Order.findByIdAndUpdate(
		req.params.id,
		{ status },
		{
			new: true,
			runValidators: true,
		}
	);

	// Send an email
	const message = `Your order with id "${order._id}" has been ${order.status}.`;

	try {
		await sendEmail({
			email: userEmail,
			subject: 'Order Update',
			message,
		});
	} catch (err) {
		console.error(err);
	}

	res.status(201).json({
		success: true,
		data: order,
	});
});

// @desc    Delete order
// @route   DELETE /api/v1/order/:id
// @access  Public
exports.deleteOrder = asyncHandler(async (req, res, next) => {
	await Order.findByIdAndDelete(req.params.id);
	res.status(201).json({
		success: true,
		data: {},
	});
});
