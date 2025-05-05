const Order = require('../models/Order'); // Adjust the path as necessary
const axios = require('axios');
// Create a new order
const createOrder = async (req, res) => {
    try {
        // Save the order to your database
        const newOrder = new Order(req.body); // Assumes req.body contains all required fields
        const savedOrder = await newOrder.save();

        // Format shipping address as a string
        const shippingAddress = `${savedOrder.shippingAddress.addressLine1}, ${savedOrder.shippingAddress.addressLine2 || ''}, ${savedOrder.shippingAddress.city}, ${savedOrder.shippingAddress.state}, ${savedOrder.shippingAddress.postalCode}, ${savedOrder.shippingAddress.country}`;

        // Prepare data for Google Sheets
        const googleSheetData = {
            "productName": savedOrder.productName,
            "productimage": savedOrder.productimage,
            "productSize": savedOrder.productSize,
            "productColor": savedOrder.productColor,
            "customerName": savedOrder.customerName,
            "customerPhone":savedOrder.customerPhone,
            "customerEmail": savedOrder.customerEmail,
            "shippingAddress": shippingAddress,
            "orderStatus": savedOrder.orderStatus,
            "paymentStatus": savedOrder.paymentStatus,
            "orderPrice":savedOrder.orderPrice,
            "orderDate": savedOrder.orderDate,
            "deliveryDate":savedOrder.deliveryDate,
        }

        // Post the data to the Google Apps Script endpoint
        const response = await axios.post(
            "https://script.google.com/macros/s/AKfycbxSX3UFjm_ZdL6PDgPVNeQWKz_unEhO94EWrgBDDgtg_KbEZFSsPNX3qJPp06ZxCCTfTw/exec",
            googleSheetData
        );

        console.log('Google Sheets response:', response.data);

        // Respond to the client
        res.status(201).json(savedOrder);

    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('productId', 'productName productPrice'); // Populate product details if needed
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('productId', 'productName productPrice');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update an order by ID
const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete an order by ID
const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(204).send(); // No content response
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Export the controller methods
module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};
