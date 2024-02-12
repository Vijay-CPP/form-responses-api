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
const flamesLogModel = mongoose.model('flamesLogs', logModelSchema);

module.exports = flamesLogModel;
