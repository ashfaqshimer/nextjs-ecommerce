const app = require('../app');
const request = require('supertest');
const shortid = require('shortid');
const Product = require('../models/Product');
const { setupDatabase } = require('../seeder');

beforeAll(setupDatabase);

describe('GET /categories', () => {
	test('Should return categories', async () => {
		const response = await request(app).get('/api/v1/categories').expect(200);
		expect(response.body.count).toBe(9);
		expect(response.body.total).toBe(9);
	});
});

describe('GET /categories with query params', () => {
	test('should return paginated categories with next for page=1 and limit=2', async () => {
		const response = await request(app)
			.get('/api/v1/categories?page=1&limit=2')
			.expect(200);
		expect(response.body.count).toBe(2);
		expect(response.body.total).toBe(9);
		expect(response.body.pagination).toMatchObject({
			next: { limit: 2, page: 2 },
		});
		expect(response.body.pagination).not.toHaveProperty('prev');
	});
	test('should return paginated categories with previous for page=4 and limit=2', async () => {
		const response = await request(app)
			.get('/api/v1/categories?page=5&limit=2')
			.expect(200);
		expect(response.body.count).toBe(1);
		expect(response.body.total).toBe(9);
		expect(response.body.pagination).toMatchObject({
			prev: { limit: 2, page: 4 },
		});
		expect(response.body.pagination).not.toHaveProperty('next');
	});
	test('should return paginated categories with next and previous for page=2 and limit=1', async () => {
		const response = await request(app)
			.get('/api/v1/categories?page=2&limit=1')
			.expect(200);
		expect(response.body.count).toBe(1);
		expect(response.body.total).toBe(9);
		expect(response.body.pagination).toMatchObject({
			prev: { limit: 1, page: 1 },
			next: { limit: 1, page: 3 },
		});
	});
});

// describe('POST /products', () => {
// 	test('should successfully save a valid product', async () => {
// 		const newProduct = {
// 			_id: '5d713a66ec8f2b88b8f830b9',
// 			name: 'New Product',
// 			sku: '10',
// 			description: 'This is a new product',
// 			quantityAvailable: 1,
// 			price: 1890.2,
// 		};
// 		const response = await request(app)
// 			.post('/api/v1/products')
// 			.send(newProduct)
// 			.expect(201);
// 		expect(response.body.data).toMatchObject(newProduct);
// 	});
// 	test('should throw an error if product with duplicate id is sent', async () => {
// 		const newProduct = {
// 			_id: '5d713a66ec8f2b88b8f830b9',
// 			name: 'New Product',
// 			sku: '45',
// 			description: 'This is a new product',
// 			quantityAvailable: 1,
// 			price: 1890.2,
// 		};
// 		const response = await request(app)
// 			.post('/api/v1/products')
// 			.send(newProduct)
// 			.expect(400);
// 		expect(response.body.error).toBe('Duplicate field value entered');
// 	});
// 	test('should throw an error if product with missing required fields is sent', async () => {
// 		const newProduct = {
// 			sku: '45',
// 			description: 'This is a new product',
// 			quantityAvailable: 1,
// 			price: 1890.2,
// 		};
// 		const response = await request(app)
// 			.post('/api/v1/products')
// 			.send(newProduct)
// 			.expect(400);
// 		expect(response.body.error).toBe('name is required');
// 	});
// });

// describe('GET /products/:id', () => {
// 	test('Should return product if correct ID in params', async () => {
// 		const id = '5d713995b721c3bb38c1f5d0';
// 		const product1 = {
// 			_id: '5d713995b721c3bb38c1f5d0',
// 			name: 'Product 1',
// 			sku: '01',
// 			description: 'This is product 1',
// 			quantityAvailable: 0,
// 			price: 10.2,
// 		};

// 		const response = await request(app)
// 			.get(`/api/v1/products/${id}`)
// 			.expect(200);

// 		expect(response.body.data).toMatchObject(product1);
// 	});
// });

// describe('PUT /products/:id', () => {
// 	test('should successfully update product 1 without changing the id of the product', async () => {
// 		const updatedProduct = {
// 			_id: '5d713a66ec8f2b88b8f830b9',
// 			name: 'Updated Product',
// 			sku: 'updatedsku',
// 			description: 'This is an updated product',
// 			quantityAvailable: 20,
// 			price: 86.2555,
// 		};
// 		const id = '5d713995b721c3bb38c1f5d0';
// 		const updatedProductWithoutId = { ...updatedProduct };
// 		delete updatedProductWithoutId._id;

// 		const response = await request(app)
// 			.put(`/api/v1/products/${id}`)
// 			.send(updatedProduct)
// 			.expect(201);
// 		expect(response.body.data).toMatchObject(updatedProductWithoutId);
// 	});
// 	test('should throw an error if product id does not exist', async () => {
// 		const updatedProduct = {
// 			_id: '5d713a66ec8f2b88b8f830b9',
// 			name: 'Updated Product',
// 			sku: 'updatedsku',
// 			description: 'This is an updated product',
// 			quantityAvailable: 20,
// 			price: 86.2555,
// 		};
// 		const id = '5d713995b721c3bb38c1f5d8';
// 		const updatedProductWithoutId = { ...updatedProduct };
// 		delete updatedProductWithoutId._id;

// 		const response = await request(app)
// 			.put(`/api/v1/products/${id}`)
// 			.send(updatedProduct)
// 			.expect(404);
// 		expect(response.body.error).toBe(`Product not found with id of ${id}`);
// 	});
// 	test('should throw an error if product details are invalid', async () => {
// 		const updatedProduct = {
// 			_id: '5d713a66ec8f2b88b8f830b9',
// 			name: 'Updated Product',
// 			sku: 'updatedsku',
// 			quantityAvailable: 20,
// 			price: 'this is not a number',
// 		};
// 		const id = '5d713995b721c3bb38c1f5d0';
// 		const updatedProductWithoutId = { ...updatedProduct };
// 		delete updatedProductWithoutId._id;

// 		const response = await request(app)
// 			.put(`/api/v1/products/${id}`)
// 			.send(updatedProduct)
// 			.expect(400);
// 		expect(response.body.error).toBe(
// 			`Cast to number failed for value "this is not a number" at path "price"`
// 		);
// 	});
// });
