// routes/dataRoutes.js
const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/flames', dataController.getData);

// To log data whenever someone visits
router.post('/flames', dataController.submitData);

module.exports = router;
