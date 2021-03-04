const dotenv = require('dotenv');

// Local imports

const colors = require('colors');

// Load env vars
// dotenv.config({ path: './config/config.env' });

const app = require('./app');

const PORT = process.env.PORT || 5000;

const server = app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
			.bold
	)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.error(`Error: ${err.message}`.red);
	// Close server and exit process
	server.close(() => process.exit(1));
});
