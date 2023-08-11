// models/FormResponse.js
const mongoose = require('mongoose');

function getDate(){
    return new Date();
}

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
        default: getDate,
    },
});

// Creating Template
const formResponse = mongoose.model('formResponse', formResponseSchema);
module.exports = formResponse;
