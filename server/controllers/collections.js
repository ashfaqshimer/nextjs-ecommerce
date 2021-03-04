const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Collection = require('../models/Collection');

const fs = require('fs');

// @desc    Get all collections
// @route   GET /api/v1/collections
// @access  Public
exports.getCollections = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedResults);
});

// @desc    Get a single collection
// @route   GET /api/v1/Collections/:slug
// @access  Public
exports.getCollection = asyncHandler(async (req, res, next) => {
	// Pagination
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 25;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;

	const collection = await Collection.findOne({
		slug: req.params.slug,
	})
		.populate({ path: 'products', options: { skip: startIndex, limit } })
		.populate('productsCount');

	if (!collection) {
		return next(new ErrorResponse(`Collection ${req.params.slug} not found`));
	}

	const totalProducts = collection.productsCount;

	// Pagination result
	const pagination = {};

	if (endIndex < totalProducts) {
		pagination.next = { page: page + 1, limit };
	}

	if (startIndex > 0) {
		pagination.prev = {
			page: page - 1,
			limit,
		};
	}

	res.status(200).json({
		success: true,
		data: collection,
		total: totalProducts,
		pagination,
	});
});

// @desc    Create category
// @route   POST /api/v1/Collections/
// @access  Public
exports.createCategory = asyncHandler(async (req, res, next) => {
	const category = await Collection.create(req.body);

	res.status(201).json({
		success: true,
		data: category,
	});
});

// @desc    update collection
// @route   PUT /api/v1/Collections/:id
// @access  Public
exports.updateCollection = asyncHandler(async (req, res, next) => {
	const collection = await Collection.findByIdAndUpdate(
		req.params.id,
		req.body
	);

	res.status(201).json({
		success: true,
		data: collection,
	});
});

// @desc    delete collection
// @route   DELETE /api/v1/Collections/:id
// @access  Public
exports.deleteCollection = asyncHandler(async (req, res, next) => {
	const collection = await Collection.findByIdAndDelete(req.params.id);

	res.status(201).json({
		success: true,
		data: collection,
	});
});
