const express = require('express');
const { getHomePage, getMoviesPage, getLoginPage, getRegisterPage} = require('../controllers/userController');

const router = express.Router();

// Define routes
router.get('/', getHomePage);
router.get('/movie', getMoviesPage);
router.get('/login', getLoginPage);
router.get('/register', getRegisterPage);


module.exports = router;
