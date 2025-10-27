const express = require('express');
const router = express.Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');

// Creating the POST Register route for a user to register a new account
router.post('/register', async (req, res) => {
    try {
        // extract email and password and name from request body
        const { email, password, name } = req.body;

        // 1. Check if user exists (if email already in database)
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'Email already in use' });

        // 2. Create new user
        const user = new User({ email, password, name });

        // 3. Save user (pre-save hook will hash password)
        await user.save();

        // 4. Generate JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        // 5. Send response
        res.status(201).json({ token }); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Creating the POST login route for an exisiting user to login
router.post('/login', async (req, res) => {
    try {
        // Extract email and password from request body
        const { email, password } = req.body;

        // Check that user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        // Check password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        // Return response: success message and the token itself
        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
})


module.exports = router;