// controllers/formController.js

// Importing the template for the document
const formResponse = require('../models/formResponse');

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
  if (!req.query.API_KEY || req.query.API_KEY !== process.env.API_KEY){
    return res.status(401).json({ message: "Unauthorized!!" });
  }

  try {
    let data = await formResponse.find().sort({"createdAt" : "desc"});
    return res.status(200).json({ responses: data});
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
}

module.exports = { submitForm, getResponses };
