const express = require('express');
const { uploadImage, updateImage, uploadMiddleware } = require('../controllers/imageController');

const router = express.Router();

// Image upload route
router.post('/upload', uploadMiddleware, uploadImage);

// Image update route
router.post('/update', uploadMiddleware, updateImage);

module.exports = router;
