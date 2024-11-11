// routes/auth.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User'); // Ensure to import your User model

// Google authentication route
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));

// Google authentication callback route
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/landing2.html'); // Redirect to landing2.html after successful login
    }
);

// Sign In Route
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        req.login(user, (err) => {
            if (err) return res.status(500).send('Server error');
            return res.redirect('/landing2.html?registered=true'); // Redirect after successful login
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Sign Up Route
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({ name, email, password });
        await user.save();
        
        req.login(user, (err) => {
            if (err) return res.status(500).send('Server error');
            return res.redirect('/landing2.html?registered=true'); // Redirect after successful signup
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
