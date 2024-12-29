// routes/loginRoutes.js
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Define routes for logins
router.get('/', loginController.getAllLogins); // Get all logins
router.get('/create', loginController.renderCreateForm); // Render form to create an logins
router.post('/', loginController.createLogin); // Create a new logins
router.get('/:id', loginController.getLoginById); // Get logins by ID
router.get('/:id/edit', loginController.renderEditForm); // Edit logins
router.put('/:id', loginController.updateLogin); // Update logins
router.delete('/:id', loginController.deleteLogin); // Delete logins

module.exports = router;
