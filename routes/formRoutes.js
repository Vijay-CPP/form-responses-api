// routes/formRoutes.js
const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

router.get('/', formController.getResponses);
router.get('/log', formController.getLogs);

// To log data whenever someone visits
router.post('/log', formController.logPresence);
router.post('/', formController.submitForm);

module.exports = router;
