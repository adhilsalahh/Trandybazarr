const express = require('express');
const router = express.Router();
const orderController = require('../controllers/ordercontroller'); // Adjust the path as necessary

// Define routes for order management
router.post('/create', orderController.createOrder); // Create a new order
router.get('/orders', orderController.getAllOrders); // Get all orders
router.get('/get/:id', orderController.getOrderById); // Get a specific order by ID
router.put('/put/:id', orderController.updateOrder); // Update a specific order by ID
router.delete('/del/:id', orderController.deleteOrder); // Delete a specific order by ID

// Export the router
module.exports = router;
