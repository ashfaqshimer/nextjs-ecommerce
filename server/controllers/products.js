const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedResults);
});

// @desc    Get best seller products
// @route   GET /api/v1/products/bestsellers
// @access  Public
exports.getBestSellerProducts = asyncHandler(async (req, res, next) => {
	const products = await Product.find().sort('name').limit(5);
	res.status(200).json({ success: true, data: products });
});

// @desc    Get a single product
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorResponse(`Product ${req.params.id} not found`));
	}

	res.status(200).json({
		success: true,
		data: product,
	});
});

// @desc    Create product
// @route   POST /api/v1/products/
// @access  Public
exports.createProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.create(req.body);

	res.status(201).json({
		success: true,
		data: product,
	});
});

// @desc    Create product
// @route   PUT /api/v1/products/:id
// @access  Public
exports.updateProduct = asyncHandler(async (req, res, next) => {
	const reqBody = { ...req.body };
	delete reqBody._id;

	let product = await Product.findById(req.params.id);

	if (!product) {
		return next(
			new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
		);
	}

	product = await Product.findByIdAndUpdate(req.params.id, reqBody, {
		new: true,
		runValidators: true,
	});

	res.status(201).json({
		success: true,
		data: product,
	});
});

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Public
exports.deleteProduct = asyncHandler(async (req, res, next) => {
	await Product.findByIdAndDelete(req.params.id);
	res.status(201).json({
		success: true,
		data: {},
	});
});
