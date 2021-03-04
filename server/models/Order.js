const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			enum: ['paid', 'shipped', 'delivered'],
			default: 'paid',
		},
		products: [
			{
				quantity: {
					type: Number,
					default: 1,
				},
				product: {
					type: mongoose.Schema.ObjectId,
					ref: 'Product',
				},
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
