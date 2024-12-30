const express = require('express');
const { getHomePage, getMoviesPage, getLoginPage, getRegisterPage} = require('../controllers/userController');

const router = express.Router();

// Define routes
router.get('/', getHomePage);
router.get('/usermovie', getMoviesPage);
router.get('/userlogin', getLoginPage);
router.get('/userregister', getRegisterPage);


module.exports = router;
