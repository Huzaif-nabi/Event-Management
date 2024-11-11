// models/Event.js

const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    eventDate: { type: Date, required: true },
    noOfMembers: { type: Number, required: true },
    eventLocation: { type: String, required: true },
    budget: { type: Number },
    eventDescription: { type: String, required: true },
    personalDetails: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        mobileNo: { type: String, required: true },
        aboutYourself: { type: String, required: true }
    }
});

const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);
module.exports = Event;

