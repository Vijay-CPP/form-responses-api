// controllers/formController.js

// Importing the template for the document
const formResponse = require('../models/formResponse');
const logData = require('../models/logModel');
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

const submitForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    // Creating actual doc from template
    const actualResponse = new formResponse({
      name,
      email,
      message,
    });
    await actualResponse.save();
    res.status(201).json({ message: 'Form response saved successfully' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'An error occurred while saving the form response' });
  }
};

const getResponses = async (req, res) => {
  if (!req.query.API_KEY || req.query.API_KEY !== process.env.API_KEY) {
    return res.status(401).json({ message: "Unauthorized!!" });
  }

  try {
    let projection = {
      _id: 0,
      name: 1,
      email: 1,
      message: 1,
      createdAt: 1
    }
    let data = await formResponse.find({}, projection).sort({ "createdAt": "desc" }).lean();

    data = data.map((item) => {
      return {
        ...item,
        createdAt: item.createdAt.toLocaleString('en-IN', dateFormatOptions)
      };
    })

    return res.status(200).json({ responses: data });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
}

const logPresence = async (req, res) => {
  const ipAddress = req.ip;
  const userAgent = req.get('user-agent');

  try {
    const temp = new logData({
      ipAddress,
      userAgent
    });
    await temp.save();
    console.log("logged succesfully!")
  } catch (error) {
    console.log("Logging Error!! - ", error);
  }
  res.status(200).json();
}

const getLogs = async (req, res) => {
  if (!req.query.API_KEY || req.query.API_KEY !== process.env.API_KEY) {
    return res.status(401).json({ message: "Unauthorized!!" });
  }

  try {
    let projection = {
      _id: 0,
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

module.exports = { submitForm, getResponses, logPresence, getLogs };
