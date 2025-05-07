// === server/index.js ===
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authroutes');
const dataRoutes = require('./routes/dataroutes');
const regRoutes = require('./routes/admin');
const orderRoutes = require('./routes/orderroutes');
const userRoutes = require('./routes/userRoutes');
const imageRoutes = require('./routes/imageRoutes');
const compression = require('compression');

const app = express();
app.set('trust proxy', 1);

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

connectDB()
  .then(() => console.log('Database connected successfully'))
  .catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1);
  });

app.use(express.static(path.join(__dirname, 'client/build'), { maxAge: '1d', etag: false }));
app.use('/Public', express.static(path.join(__dirname, 'Public')));

// Routes
app.use('/api/admin', regRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send('Server Running...'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  process.exit(1);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
