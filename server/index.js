const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

// Route Imports
const authRoutes = require('./routes/authroutes');
const dataRoutes = require('./routes/dataroutes');
const regRoutes = require('./routes/admin');
const OrderRoutes = require('./routes/orderroutes');
const userRoutes = require('./routes/userRoutes');
const compression = require('compression');
const ImageRouter = require('./routes/imageRoutes');

// Initialize app
const app = express();

// Set 'trust proxy' to allow Express to trust the 'X-Forwarded-For' header
app.set('trust proxy', 1);

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression()); // Enable GZIP compression

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

// Connect to Database
connectDB()
    .then(() => console.log('Database connected successfully'))
    .catch(err => {
        console.error('Database connection error:', err);
        process.exit(1);
    });

// Static Files with Caching
app.use(express.static(path.join(__dirname, 'client/build'), {
    maxAge: '1d',
    etag: false
}));
app.use('/Public', express.static(path.join(__dirname, 'Public')));

// Routes
app.use('/api/admin', regRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/order', OrderRoutes);
app.use('/api/images', ImageRouter);
app.use('/api/users', userRoutes);

// Default Route
app.get('/', (req, res) => {
    res.send('Server Running...');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message);
});

// Handle Unhandled Rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled rejection:', err);
    process.exit(1);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));