const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User'); // Ensure to import your User model

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
