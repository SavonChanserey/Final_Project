const express = require('express');
const { getHomePage, getMoviesPage, getLoginPage, getRegisterPage, postRegisterPage, getDetailPageByMovieId} = require('../controllers/userController');

const router = express.Router();

// Define routes
router.get('/', getHomePage);
router.get('/usermovie', getMoviesPage);
router.get('/userlogin', getLoginPage);
router.get('/userregister', getRegisterPage);
router.post('/userregister', postRegisterPage);
router.get('/userdetail/:movie_id', getDetailPageByMovieId);

module.exports = router;
