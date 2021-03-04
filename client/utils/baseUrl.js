const baseUrl =
	process.env.NODE_ENV === 'production'
		? 'https://deployement-url.now.sh'
		: 'http://localhost:5000';

export default baseUrl;
