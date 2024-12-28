const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const upload = require('../config/multer');

// Middleware for overriding methods
const methodOverride = require('method-override');
router.use(methodOverride('_method'));

router.get('/create',movieController.renderCreateForm);

router.post('/', upload.single('image'),movieController.createMovie);
router.get('/',movieController.getAllMovies);
router.get('/:id', movieController.getMovieById); // Show product details
router.get('/:id/edit', movieController.renderEditForm); // Show edit form
router.put('/:id', upload.single('image'),movieController.updateMovie); // Update product
router.delete('/:id', movieController.deleteMovie); // Delete product


module.exports = router;