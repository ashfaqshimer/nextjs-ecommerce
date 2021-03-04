import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
	// Configure one or more authentication providers
	providers: [
		// ...add more providers here
		Providers.Google({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
	],

	// A database is optional, but required to persist accounts in a database
	// database: process.env.DATABASE_URL,
	secret: 'mysecret',
	callbacks: {
		redirect: async (url, baseUrl) => {
			return Promise.resolve(baseUrl);
		},
	},
};

export default (req, res) => NextAuth(req, res, options);
