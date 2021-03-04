const path = require('path');
const express = require('express');
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');

const connectDb = require('./config/db');
// Passport config
require('./config/passport')(passport);

// Connect to database
connectDb();

// Route files
const productsRoutes = require('./routes/products');
const collectionsRoutes = require('./routes/collections');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

const errorHandler = require('./middleware/errorHandler');

const app = express();

// Body parsers
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev loggin middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
// Enable CORS
app.use(cors());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// File uploading
app.use(fileupload());

// ----------------------------------SERVER LOGIC-----------------------------------------------------------

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/v1', (req, res) => {
	res.send('Welcome to Muscle Monster API');
});

// Mount routers
app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/collections', collectionsRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/order', orderRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;
