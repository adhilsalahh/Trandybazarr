import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key';

export const AuthMiddleware = {
  verifyToken(token) {
    try {
      if (!token) {
        throw new Error('No token provided');
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  },

  async verifySupplier() {
    try {
      // Mock supplier verification
      const mockVerificationStatus = false;
      return { isVerified: mockVerificationStatus };
    } catch (error) {
      throw new Error('Error verifying supplier');
    }
  }
};