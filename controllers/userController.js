const { addUser, getUsers } = require('../models/userModel');

// Controller for rendering home page
const getHomePage = (req, res) => {
    res.render('index', { title: 'Cinema - Home',  });
};

// Controller for rendering movies page
const getMoviesPage = (req, res) => {
    const movies = [
        {
            title: "Movie 1",
            description: "Description of movie 1",
            image: "C:/Users/KORNG/OneDrive - Cambodia Academy of Digital Technology/Documents/GitHub/Final_Project/public/image/image copy 2.png",
        },
        // Add more movies as needed
    ];
    res.render('usermovie', { title: 'Cinema - Movies', movies: movies });
};

// Controller for rendering login page
const getLoginPage = (req, res) => {
    res.render('userlogin', { title: 'Cinema - Login' });
};

// Controller for rendering register page
const getRegisterPage = (req, res) => {
    res.render('userregister', { title: 'Cinema - Register' });
};
module.exports = { getHomePage, getMoviesPage, getLoginPage, getRegisterPage };
