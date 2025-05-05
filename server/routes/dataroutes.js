const express = require('express');
const { uploadData, updateProduct, deleteProduct,getProductById,getAllProducts } = require('../controllers/admincontroller');
const authMiddleware = require('../middlewares/authmiddleware');
const router = express.Router();

// Protected Routes
router.post('/upload', uploadData);//authMiddleware ,
router.get('/gets', getAllProducts); // Get all products
router.get('/get/:id', getProductById);
router.put('/edit/:id', updateProduct);//authMiddleware ,
router.delete('/delete/:id', deleteProduct);//authMiddleware ,

module.exports = router;
