const mongoose = require('mongoose');

const connectDb = async () => {
	const conn = await mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	});
	if (process.env.NODE_ENV === 'development') {
		console.log(
			`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
		);
	}
};

module.exports = connectDb;
