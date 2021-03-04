const ErrorResponse = require('../utils/ErrorResponse');

const errorHandler = (err, req, res, next) => {
	let error = { ...err };

	error.message = err.message;

	// Log to console for dev
	if (process.env.NODE_ENV === 'development') {
		console.error(err.stack.red);
	}

	// console.log(error);

	// Mongoose bad ObjectId
	if (err.name === 'CastError') {
		if (err.path === '_id') {
			const message = `Resource not found`;
			error = new ErrorResponse(message, 404);
		} else {
			const message = err.message;
			error = new ErrorResponse(message, 400);
		}
	}

	// Mongoose duplicate key
	if (err.code === 11000) {
		const message = 'Duplicate field value entered';
		error = new ErrorResponse(message, 400);
	}

	// Mongoose validation error
	if (err.name === 'ValidationError') {
		const message = Object.values(err.errors).map((value) => value.message);
		error = new ErrorResponse(message, 400);
	}

	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || 'Server Error'
	});
};

module.exports = errorHandler;
