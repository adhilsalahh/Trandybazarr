import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;
const JWT_SECRET = 'your-secret-key';

export const Auth = {
  async register(userData) {
    try {
      const { email, password, full_name, phone } = userData;
      
      // Hash password
      const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
      
      // Create user
      const user = {
        email,
        password_hash: passwordHash,
        full_name,
        phone,
        role: 'customer'
      };
      
      // Generate token
      const token = jwt.sign(
        { userId: user.id, role: 'customer' },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      return { token, user };
    } catch (error) {
      throw new Error('Error registering user');
    }
  },

  async login(credentials) {
    try {
      const { email, password } = credentials;
      
      // Mock user for example - replace with actual DB query
      const mockUser = {
        id: '1',
        email,
        password_hash: await bcrypt.hash(password, SALT_ROUNDS),
        role: 'customer'
      };

      // Validate credentials
      const validPassword = await bcrypt.compare(password, mockUser.password_hash);

      if (!validPassword) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign(
        { userId: mockUser.id, role: mockUser.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      return { token, user: mockUser };
    } catch (error) {
      throw new Error('Error logging in');
    }
  }
};