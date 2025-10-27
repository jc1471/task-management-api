require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();

// Middleware setup

// Adds security headers (OWASP best practice)
app.use(helmet());
// Handles Cross-Origin Resource Sharing (frontend <-> backend)
app.use(cors());
app.use(express.json());
// HTTP request logger for debugging
app.use(morgan('dev'));

// Set rate limiter
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Max 10 requests per windowMs
    message: { error: 'Exceeded request limit, please try again later' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Test route
app.get('/', (req, res) => res.json({ ok: true }));

// MongoDB connection setup
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error', err.message);
        process.exit(1);
    });

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));