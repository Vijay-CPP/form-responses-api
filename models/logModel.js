// models/FormResponse.js
const mongoose = require('mongoose');

function getDate(){
    return new Date();
}

const logModelSchema = new mongoose.Schema({
    ipAddress: {
        type: String,
    },
    userAgent: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: getDate,
    }
});

// Creating Template
const logModel = mongoose.model('visitor', logModelSchema);
module.exports = logModel;
