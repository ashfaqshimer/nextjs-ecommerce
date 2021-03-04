import axios from 'axios';
import BASE_URL from '../utils/baseUrl';

export const createUser = async (payload) => {
	const response = await axios.post(
		`${BASE_URL}/api/v1/auth/register`,
		payload
	);
	return response.data;
};

export const logout = async () => {
	const response = await axios.get(`${BASE_URL}/api/v1/auth/logout`);
	return response.data;
};

export const loginUser = async (payload) => {
	const response = await axios.post(`${BASE_URL}/api/v1/auth/login`, payload);
	return response.data;
};

export const oAuthLogin = async () => {
	const response = await axios.get(`${BASE_URL}/api/v1/auth/google`);

	return response.data;
};
