// models/FormResponse.js
const mongoose = require('mongoose');

const formResponseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Creating Template
const formResponse = mongoose.model('formResponse', formResponseSchema);
module.exports = formResponse;
