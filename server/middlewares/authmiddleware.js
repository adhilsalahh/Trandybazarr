const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization')?.split(' ')[1]; // Split to get the token part

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' }); // Check if the token exists
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "Trendy12345jwt"); // Use process.env.JWT_SECRET if available

    // Attach the decoded admin info to the request object
    req.admin = decoded.admin; 
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Invalid token' }); // Handle invalid tokens without revealing secret
  }
};
