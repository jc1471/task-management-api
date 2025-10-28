// This file is gatekeeper for all protected routes
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    // Extract token from header
    const authHeader = req.headers['authorization']; // Token is found in the authorization header. here it is extracted from req
    
    // Checks first that authHeader isn't null or undefined
    // Then takes token which is 2nd string, hence split and [1]
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Access token required' });

    // Verify the token using our JWT secret key
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid or expired token' });
        
        // Attach payload (id, role) to req.user
        req.user = user;
        next(); // Allow the request to continue
    })
}

// Export the middleware so we can use it in our routes
module.exports = authenticateToken;
