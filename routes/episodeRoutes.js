// routes/episodeRoutes.js
const express = require('express');
const router = express.Router();
const episodeController = require('../controllers/episodeController');

// Define routes for episodes
router.get('/', episodeController.getAllEpisodes); // Get all episodes
router.get('/create', episodeController.renderCreateForm); // Render form to create an episode
router.post('/', episodeController.createEpisode); // Create a new episode
router.get('/:id', episodeController.getEpisodeById); // Get episode by ID
router.get('/:id/edit', episodeController.renderEditForm); // Edit episode
router.put('/:id', episodeController.updateEpisode); // Update episode
router.delete('/:id', episodeController.deleteEpisode); // Delete episode

module.exports = router;
