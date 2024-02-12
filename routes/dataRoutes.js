// routes/dataRoutes.js
const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/flames', dataController.getData);
router.get('/flames-log', dataController.getLogs);

// To log data whenever someone visits
router.post('/flames', dataController.submitData);
router.post('/flames-log', dataController.logPresence);

module.exports = router;
