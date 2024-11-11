// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Import path module
const connectDB = require('./db/conn');
const User = require('./modules/userModel'); // Ensure this points to your user model

const app = express();
const port = 3000; // Changed from process.env.PORT || 5000 to 3000

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the public directory

// Connect to the database
connectDB();

app.use(express.static(path.join(__dirname, '../public'))); // Serve static files from the public directory


// Serve the login page at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/Login.html'));  // Ensure the path is correct
});

// User registration endpoint
app.post('/api/users', async (req, res) => {
    const { name, email, password } = req.body;

    // Validate that all fields are provided
    if (!name || !email || !password) {
        return res.status(400).send({ error: 'All fields are required' });
    }

    try {
        // Create a new user instance
        const user = new User({ name, email, password });
        
        // Save the user in the database
        await user.save();

        // Send success response
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        // Send error response if registration fails
        res.status(400).send({ error: error.message });
    }
});



// User login endpoint
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Here, you would typically use bcrypt to compare passwords
        if (user.password !== password) {
            return res.status(401).send({ message: 'Invalid password' });
        }

        res.send({ message: 'Login successful' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
