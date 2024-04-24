// authentication.js

const jwt = require('jsonwebtoken');

// Middleware function to authenticate requests using JWT tokens
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract JWT token from Authorization header
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden: Invalid token' });
    }
    req.user = user; // Attach authenticated user data to request object
    next(); // Pass control to the next middleware or route handler
  });
};

module.exports = { authenticateToken };
