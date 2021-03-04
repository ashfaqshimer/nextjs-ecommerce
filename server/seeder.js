const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/dev.env' });

// Load models
const Product = require('./models/Product');
const Collection = require('./models/Collection');
// const User = require('./models/User');
// const Review = require('./models/Review');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
});

// Read JSON files
const products = JSON.parse(
	fs.readFileSync(`${__dirname}/__data__/products.json`, 'utf-8')
);
const collections = JSON.parse(
	fs.readFileSync(`${__dirname}/__data__/collections.json`, 'utf-8')
);
// const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'));
// const reviews = JSON.parse(fs.readFileSync(`${__dirname}/_data/reviews.json`, 'utf-8'));

// Import into DB
const importData = async () => {
	try {
		const promises = [Collection.create(collections), Product.create(products)];
		await Promise.all(promises);

		if (process.env.NODE_ENV !== 'test') {
			console.log('Data imported...'.green.inverse);
			process.exit();
		}
	} catch (err) {
		console.error(err);
		// Delete all the records in case it fails
		await Product.deleteMany();
	}
};

// Delete data
const deleteData = async () => {
	try {
		const promises = [Collection.deleteMany(), Product.deleteMany()];
		await Promise.all(promises);
		// await Category.deleteMany();
		// await Product.deleteMany();

		if (process.env.NODE_ENV !== 'test') {
			console.log('Data Destroyed...'.red.inverse);
			process.exit();
		}
	} catch (err) {
		console.error(err);
	}
};

exports.setupDatabase = async () => {
	await deleteData();
	await importData();
};

if (process.argv[2] === '-i') {
	importData();
} else if (process.argv[2] === '-d') {
	deleteData();
}
