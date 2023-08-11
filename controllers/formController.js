// controllers/formController.js

// Importing the template for the document
const formResponse = require('../models/formResponse');
const logData = require('../models/logModel');

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
        createdAt: item.createdAt.toUTCString()
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
        timestamp: item.timestamp.toUTCString()
      };
    })

    return res.status(200).json({ logs });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
}

module.exports = { submitForm, getResponses, logPresence, getLogs };
