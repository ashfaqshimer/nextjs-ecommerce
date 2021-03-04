const mongoose = require('mongoose');
const shortid = require('shortid');
const slugify = require('slugify');

const ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'name is required'],
	},
	price: {
		type: Number,
		required: true,
	},
	imageUrl: {
		type: String,
	},
	slug: {
		type: String,
	},
	sku: {
		type: String,
		unique: true,
		default: shortid.generate(),
	},
	description: {
		type: String,
		required: [true, 'description is required'],
	},
	quantityAvailable: {
		type: Number,
		default: 0,
	},
	productCollection: {
		type: mongoose.Schema.ObjectId,
		ref: 'Collection',
		required: true,
	},
});

// Create bootcamp slug from name
ProductSchema.pre('save', function (next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});

module.exports = mongoose.model('Product', ProductSchema);
