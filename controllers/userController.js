const { addUser} = require('../models/userModel');
const db = require('../config/database');
const bcrypt = require('bcrypt');
// Controller for rendering home page
const getHomePage = (req, res) => {
    res.render('index', { title: 'Cinema - Home',  });
};

// Controller for rendering movies page
const getMoviesPage = async (req, res) => {
    try {
        // Fetch movies from the database
        const [movies] = await db.query('SELECT title, description, image FROM movies');
        console.log('Movies:', movies); 
        res.render('usermovie', { movies }); // Pass movies to EJS template
    } catch (err) {
        console.error(err);
        res.status(500).send('Database query failed');
    }
};

// Controller for rendering login page
const getLoginPage = (req, res) => {
    res.render('userlogin', { title: 'Cinema - Login' });
};

const getRegisterPage = (req, res) => {
    res.render('userregister', { title: 'Cinema - Register' });
};
// Controller for rendering register page
const postRegisterPage = async (req, res) => {
    const { email, password, confirm_password } = req.body;

    // Check if passwords match
    if (password !== confirm_password) {
        return res.status(400).send('Passwords do not match');
    }

    try {
        // Check if email already exists in the database
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).send('Email is already taken');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Add user to the database
        const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
        await db.query(query, [email, hashedPassword]);

        console.log('User registered successfully');
        res.redirect('/login'); // Redirect to the login page after successful registration
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).send('Failed to register user');
    }
};


const getDetailPageByMovieId = async (req, res) => {
    const movieId = req.params.movie_id;

    try {
        // Fetch the specific movie from the database
        const [movies] = await db.query('SELECT id, title, description, image FROM movies WHERE id = ?', [movieId]);

        if (movies.length === 0) {
            return res.status(404).send('Movie not found');
        }

        // Fetch episodes related to this movie
        const [episodes] = await db.query('SELECT episode, movie_id, link FROM episodes WHERE movie_id = ?', [movieId]);

        // Pass data to the EJS template
        res.render('userdetail', { movies, episodes });
    } catch (error) {
        console.error('Error fetching movie details:', error);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = { getHomePage, getMoviesPage, getLoginPage, postRegisterPage, getRegisterPage ,getDetailPageByMovieId,};
