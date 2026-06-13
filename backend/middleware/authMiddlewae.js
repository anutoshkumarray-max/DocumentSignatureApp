import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  let token;

  // Check header me authorization token hai ya nahi aur wo 'Bearer' se shuru ho raha hai ya nahi
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Header se main token string alag karo
      token = req.headers.authorization.split(' ')[1];

      // Token ko secret key se verify karo
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // User ka data nikal kar request me attach karo (password ko chhodkar)
      req.user = await User.findById(decoded.id).select('-password');

      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token validation failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, access token missing' });
  }
};

export default protect;