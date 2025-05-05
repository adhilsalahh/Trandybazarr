const { default: mongoose } = require('mongoose');
const Admin = require('../models/Admin');
const Product = require('../models/Data');  // Use Product schema instead of Data
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, '../Public/Image'));
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });




// Admin login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    console.log(admin);

    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);  // Secure password comparison
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ admin: { id: admin._id } }, "Trendy12345jwt", { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
    console.log(error);

  }
};

// Create a new product (with optional fields)
exports.uploadData = async (req, res) => {
  const {
    name,
    description,
    price,
    discountPrice,
    Producttype,
    Type,
    brand,           // Optional
    material,        // Optional
    dimensions,      // Optional
    weight,          // Optional
    warranty,        // Optional
    shippingInfo,    // Optional
    returnPolicy,    // Optional
    size,
    rating,
    gender,
    stock,
    category,
    tags,
    images
  } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      discountPrice: discountPrice || null,   // If not provided, set to null
      Type: Type,
      Producttype:Producttype,
      brand: brand || null,
      material: material || null,
      dimensions: dimensions || {},           // Optional object
      weight: weight || null,
      warranty: warranty || null,
      shippingInfo: shippingInfo || null,
      returnPolicy: returnPolicy || null,
      size: size,
      rating: rating || 0,                    // Default rating to 0
      gender,
      stock,
      category,
      tags: tags || [],                       // Default to empty array if not provided
      images: images || []                    // Default to empty array if not provided
    });

    await newProduct.save();
    res.json({ message: 'Product created successfully', data: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// Get all products (include all fields)
// Improved function to retrieve all products with error handling and optional pagination
exports.getAllProducts = async (req, res) => {
  try {
    // Implement pagination (optional) to avoid fetching too many products at once
    const limit = parseInt(req.query.limit) || 10; // Default limit: 10 products per page
    const page = parseInt(req.query.page) || 1;    // Default page: 1

    // Fetch products with pagination and sort (optional sorting by a field)
    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(limit);

    // If products retrieved successfully
    res.json({ message: 'Products retrieved successfully', data: products });
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error retrieving products:', error);

    // Return server error response with the error message
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};


// Get a specific product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);  // Retrieve product by ID
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json({ message: 'Product retrieved successfully', data: product });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// Update product details
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    discountPrice,
    Type,
    Producttype,
    brand,
    material,
    dimensions,
    weight,
    warranty,
    shippingInfo,
    returnPolicy,
    size,
    rating,
    gender,
    stock,
    category,
    tags,
    images
  } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        discountPrice,
        Type,
        Producttype,
        brand,
        material,
        dimensions,
        weight,
        warranty,
        shippingInfo,
        returnPolicy,
        size,
        rating,
        gender,
        stock,
        category,
        tags,
        images
      },
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });

    res.json({ message: 'Product updated successfully', data: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  // Validate ObjectID
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

