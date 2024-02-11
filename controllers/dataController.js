// controllers/data.js

// Importing the template for the document
const dataModel = require('../models/dataModel');

const dateFormatOptions = {
    timeZone: 'Asia/Kolkata', // Set the timezone to Indian Standard Time (IST)
    weekday: 'short',        // Abbreviated weekday name (e.g., Fri)
    day: '2-digit',          // Day of the month with leading zeros (e.g., 11)
    month: 'short',          // Abbreviated month name (e.g., Aug)
    year: 'numeric',         // Four-digit year (e.g., 2023)
    hour: '2-digit',         // Hour with leading zeros (e.g., 15)
    minute: '2-digit',       // Minute with leading zeros (e.g., 17)
    second: '2-digit',       // Second with leading zeros (e.g., 46)
    hour12: true,
    timeZoneName: 'short',   // Abbreviated timezone name (e.g., IST)
    fractionalSecondDigits: 3 // milisc with 3 digits
};

const submitData = async (req, res) => {
    try {
        const { name1, name2 } = req.body;
        const ipAddress = req.ip;
        const userAgent = req.get('user-agent');

        // Creating actual doc from template
        const actualData = new dataModel({
            name1,
            name2,
            ipAddress,
            userAgent,
        });
        await actualData.save();
        res.status(201).json({ message: 'Form response saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while saving the form response' });
    }
};

const getData = async (req, res) => {
    if (!req.query.API_KEY || req.query.API_KEY !== process.env.API_KEY) {
        return res.status(401).json({ message: "Unauthorized!!" });
    }

    try {
        let projection = {
            _id: 0,
            name1: 1,
            name2: 1,
            ipAddress: 1,
            userAgent: 1,
            timestamp: 1
        }

        // Lean to remove additional properties of mongoose which arises while cloning
        let data = await logData.find({}, projection).sort({ "timestamp": "desc" }).lean();

        // Formatting the date
        let logs = data.map((item) => {
            return {
                ...item,
                timestamp: item.timestamp.toLocaleString('en-IN', dateFormatOptions)
            };
        })

        return res.status(200).json({ logs });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error!!" });
    }
}

module.exports = { submitData, getData };
