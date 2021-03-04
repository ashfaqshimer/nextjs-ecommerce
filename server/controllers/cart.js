const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Cart = require('../models/Cart');
const mongoose = require('mongoose');

// @desc   Get Cart
// @route   GET /api/v1/cart/:userid
// @access  Public
exports.getCart = asyncHandler(async (req, res, next) => {
	const cart = await Cart.findOne({ user: req.params.userId }).populate(
		'products.product'
	);

	res.status(201).json({
		success: true,
		data: cart,
	});
});

// @desc   Add to cart
// @route   PUT /api/v1/cart/:id
// @access  Public
exports.updateCart = asyncHandler(async (req, res, next) => {
	const { productId, quantity } = req.body;
	const cart = await Cart.findOne({ _id: req.params.id });

	// const productExists = cart.products.find(
	// 	(product) => product._id === productId
	// );
	// Check if product already exists in cart
	const productExists = cart.products.some((doc) =>
		mongoose.Types.ObjectId(productId).equals(doc.product)
	);

	let newCart = cart;

	// If so, increment quantity (by number provided to request)
	if (productExists) {
		newCart = await Cart.findOneAndUpdate(
			{ _id: cart._id, 'products.product': productId },
			{ $inc: { 'products.$.quantity': quantity } },
			{ new: true }
		).populate('products.product');
	} else {
		// If not, add new product with given quantity
		const newProduct = { quantity, product: productId };
		newCart = await Cart.findOneAndUpdate(
			{ _id: cart._id },
			{ $addToSet: { products: newProduct } },
			{ new: true }
		).populate('products.product');
	}

	await newCart.cleanupProducts();
	res.status(201).json({
		success: true,
		data: newCart,
	});
});

// @desc   Remove cart item
// @route   DELETE /api/v1/cart/:id
// @access  Public
exports.deleteCartItem = asyncHandler(async (req, res, next) => {
	const { productId } = req.query;

	const cart = await Cart.findOneAndUpdate(
		{ _id: req.params.id },
		{ $pull: { products: { product: productId } } },
		{ new: true }
	).populate('products.product');

	res.status(200).json({
		success: true,
		data: cart,
	});
});
