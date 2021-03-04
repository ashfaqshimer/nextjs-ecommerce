const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
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
});

// Filter out quantity 0 items
CartSchema.methods.cleanupProducts = function () {
	// Create a new products array
	const filteredProducts = this.products.filter(
		(product) => product.quantity > 0
	);

	this.products = filteredProducts;

	return filteredProducts;
};

// // Encrypt password using bcrypt
// CartSchema.pre('save', async function (next) {
// 	const filteredProducts = this.products.filter(
// 		(product) => product.quantity > 0
// 	);
// 	console.log('filteredProducts', filteredProducts);

// 	this.products = filteredProducts;

// 	next();
// });

module.exports = mongoose.model('Cart', CartSchema);
