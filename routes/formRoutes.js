// routes/formRoutes.js
const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

router.get('/', formController.getResponses);
router.post('/', formController.submitForm);

module.exports = router;
