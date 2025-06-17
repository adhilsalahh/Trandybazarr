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

// Static files
app.use(express.static(path.join(__dirname, 'client/build'), { maxAge: '1d', etag: false }));
app.use('/Public', express.static(path.join(__dirname, 'Public')));

// Routes
app.use('/api/admin', regRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/users', userRoutes);

// Default route
app.get('/', (req, res) => res.send('Server Running...'));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message);
});

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  process.exit(1);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
