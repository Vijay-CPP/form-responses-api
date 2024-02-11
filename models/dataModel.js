// models/FormResponse.js
const mongoose = require('mongoose');

function getDate() {
    return new Date();
}

const dataSchema = new mongoose.Schema({
    name1: {
        type: String,
    },
    name2: {
        type: String,
    },
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
const dataModel = mongoose.model('flames', dataSchema);
module.exports = dataModel;
