const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../config/multer');

// Middleware for overriding methods
const methodOverride = require('method-override');
router.use(methodOverride('_method'));

router.get('/',userController.getAllMovie);
router.get('/create',userController.renderCreateForm);
router.post('/', upload.single('image'),userController.createProduct);
router.get('/:id', userController.getProductById); // Show product details
router.get('/:id/edit', userController.renderEditForm); // Show edit form
router.put('/:id', upload.single('image'),userController.updateProduct); // Update product
router.delete('/:id', productController.deleteProduct); // Delete product


module.exports = router;