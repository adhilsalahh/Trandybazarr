const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,  // Reference to the product model
        ref: 'Product',  // Assuming you have a 'Product' model
        required: true
    },
    productName:{
        type:String,
        required:true
    },
    productimage: {
        type: String,
        required: true
    },
    productSize: {
        type: String,
        required: true
    },
    productColor: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerPhone: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    shippingAddress: {
        addressLine1: { type: String, required: true },
        addressLine2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    orderStatus: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending'
    },
    orderPrice: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    deliveryDate: {
        type: Date,
        default: () => {
            // Add 7 days to the current date
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 7);
            return currentDate;
        }
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
