// eventController.js

// Import the Event model
const Event = require('../models/Event'); // Ensure this path is correct

// Function to handle saving a new event
const saveEvent = async (req, res) => {
    try {
        // Create a new event with data from the request body
        const newEvent = new Event({
            eventName: req.body.eventName,
            eventDate: req.body.eventDate,
            noOfMembers: req.body.noOfMembers,
            eventLocation: req.body.eventLocation,
            budget: req.body.budget,
            eventDescription: req.body.eventDescription,
            personalDetails: {
                name: req.body.name,
                email: req.body.email,
                mobileNo: req.body.mobileNo,
                aboutYourself: req.body.aboutYourself
            }
        });

        // Save the event to the database
        await newEvent.save();

        // Send a success response
        res.status(201).json({ message: 'Event details saved successfully!' });
    } catch (error) {
        console.error('Error saving event details:', error);
        res.status(500).json({ message: 'An error occurred while saving event details' });
    }
};

// Export the function for use in server.js
module.exports = { saveEvent };
