const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  discountPrice: { type: Number },                // Optional
  brand: { type: String },                        // Optional
  material: { type: String },                     // Optional
  dimensions: {                                   // Optional
    height: { type: Number },
    width: { type: Number },
    depth: { type: Number }
  },
  weight: { type: Number },                       // Optional
  warranty: { type: String },                     // Optional
  shippingInfo: { type: String },                 // Optional
  returnPolicy: { type: String },                 // Optional
  size: { 
    values: { type: [String], required: true },
    unit: { 
      type: String,
      enum: ['cm', 'inch', 'letter'],
      required: true 
    }
  },
  Type:{ type: String, required: true },
  Producttype:{ type: String, required: true },
  rating: { type: Number, default: 0 },           // Default to 0 if not provided
  reviews: { type: Number, default: 0 },          // Default to 0 if not provided
  gender: { type: String, required: true, enum: ['male', 'female', 'unisex'] },
  stock: { type: String, required: true, enum: ['in_stock', 'out_of_stock'] },
  category: { type: String, required: true },
  tags: { type: [String], default: [] },          // Default to empty array
  images: { 
    type: [{ 
      imageUrl: { type: String, required: true },
      color: { type: String, required: true }
    }],
    default: []
  },
  customerReviews: { 
    type: [{ 
      username: String,
      rating: Number,
      comment: String
    }],
    default: []
  },
  createdAt: { type: Date, default: Date.now },
}, {
  timestamps: true
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
