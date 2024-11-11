// server.js

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('./config/passportConfig'); // Ensure this path is correct
const authRoutes = require('./routes/auth'); // Ensure this path is correct
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = 3000;
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/event_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Event Schema and Model
const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    eventDate: { type: Date, required: true },
    noOfMembers: { type: Number, required: true },
    eventLocation: { type: String, required: true },
    budget: { type: Number },
    eventDescription: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobileNo: { type: String, required: true },
    aboutYourself: { type: String, required: true },
});
const Event = mongoose.model('Event', eventSchema);

// Routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/landing.html'));
});

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    // Successful authentication, redirect to landing2.html
    res.redirect('/landing2.html');
});

app.get('/landing2.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'landing2.html'));
});

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

app.get('/Event-details.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Event-details.html'));
});

// Handle Event Form Submission
app.post('/event', async (req, res) => {
    try {
        const eventData = {
            eventName: req.body.eventName,
            eventDate: req.body.eventDate,
            noOfMembers: req.body.noOfMembers,
            eventLocation: req.body.eventLocation,
            budget: req.body.budget,
            eventDescription: req.body.eventDescription,
            name: req.body.name,
            email: req.body.email,
            mobileNo: req.body.mobileNo,
            aboutYourself: req.body.aboutYourself,
        };

        // Log the event data to the console
        console.log('Received Event Data:', eventData);

        // Create a new event in the database
        const event = new Event(eventData);
        await event.save();

        res.status(200).json({ message: 'Event created successfully!' });
    } catch (error) {
        console.error('Error saving event:', error);
        res.status(500).json({ message: 'Failed to create event' });
    }
});

// Fetch all events
app.get('/events', async (req, res) => {
    try {
        const events = await Event.find(); // Fetch all events from the database
        res.status(200).json(events); // Send the list of events as JSON
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Failed to fetch events' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
