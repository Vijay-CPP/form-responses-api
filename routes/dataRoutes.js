// routes/dataRoutes.js
const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/get-flames-data', dataController.getData);

// To log data whenever someone visits
router.post('/post-flames-data', dataController.submitData);

module.exports = router;
