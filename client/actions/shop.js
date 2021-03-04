import axios from 'axios';
import BASE_URL from '../utils/baseUrl';

export const getCollections = async () => {
	const response = await axios.get(`${BASE_URL}/api/v1/collections`);
	return response.data;
};

export const getCollectionBySlug = async (slug, { page = 1, limit = 20 }) => {
	const query = `page=${page}&limit=${limit}`;

	const response = await axios.get(
		`${BASE_URL}/api/v1/collections/${slug}?${query}`
	);
	return response.data;
};

export const getProducts = async () => {
	const response = await axios.get(`${BASE_URL}/api/v1/products`);
	return response.data;
};

export const getProductById = async (id) => {
	const response = await axios.get(`${BASE_URL}/api/v1/products/${id}`);
	return response.data;
};

export const getLatestProducts = async () => {
	const query = `sort=createdAt&limit=8`;

	const response = await axios.get(`${BASE_URL}/api/v1/products?${query}`);
	return response.data;
};

export const getBestSellerProducts = async () => {
	const query = `sort=imageUrl&limit=8`;

	const response = await axios.get(`${BASE_URL}/api/v1/products?${query}`);
	return response.data;
};

export const getUserCart = async (user) => {
	const response = await axios.get(`${BASE_URL}/api/v1/cart/${user._id}`);
	return response.data;
};

export const updateUserCart = async (cartId, productId, quantity) => {
	const response = await axios.put(`${BASE_URL}/api/v1/cart/${cartId}`, {
		productId,
		quantity,
	});
	return response.data;
};

export const deleteCartItem = async (cartId, productId) => {
	const response = await axios.delete(
		`${BASE_URL}/api/v1/cart/${cartId}?productId=${productId}`
	);
	return response.data;
};

export const makeOrder = async (token, priceForStripe) => {
	const response = await axios.post(`${BASE_URL}/api/v1/order`, {
		amount: Math.round(priceForStripe),
		token,
		user: JSON.parse(window.localStorage.getItem('user')),
	});
	return response.data;
};
