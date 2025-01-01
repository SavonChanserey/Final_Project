const { addUser} = require('../models/userModel');
const db = require('../config/database');
const bcrypt = require('bcrypt');
// Controller for rendering home page
const getHomePage = (req, res) => {
    res.render('index/', { title: 'Cinema - Home', user: req.session.user});
};

// Controller for rendering movies page
const getMoviesPage = async (req, res) => {
    try {
        // Fetch movies from the database
        const [movies] = await db.query('SELECT id, title, description, image FROM movies');
        console.log('Movies:', movies); 
        res.render('index/usermovie', { movies, user: req.session.user }); // Pass movies to EJS template
    } catch (err) {
        console.error(err);
        res.status(500).send('Database query failed');
    }
};

// Controller for handling user login (sign-in)
const postLoginPage = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the email exists in the database
        const [user] = await db.query('SELECT * FROM logins WHERE email = ?', [email]);
        if (user.length === 0) {
            return res.status(400).send('Email not found');
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(400).send('Incorrect password');
        }

        req.session.user = user[0];
        console.log('User logged in successfully');
        const redirectUrl = req.session.redirectTo || '/';
        delete req.session.redirectTo;
        res.redirect(redirectUrl);
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send('Failed to login');
    }
};

const getRegisterPage = (req, res) => {
    res.render('index/userregister', { title: 'Cinema - Register' });
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
        const [existingUser] = await db.query('SELECT * FROM logins WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).send('Email is already taken');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Add user to the database
        const query = 'INSERT INTO logins (email, password) VALUES (?, ?)';
        await db.query(query, [email, hashedPassword]);

        console.log('User registered successfully');
        res.redirect('index/userlogin'); // Redirect to the login page after successful registration
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
        res.render('index/userdetail', { movies, episodes, user: req.session.user });
    } catch (error) {
        console.error('Error fetching movie details:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getLoginPage = (req, res) => {
    res.render('index/userlogin', { title: 'Cinema - Login' });
};

const postLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Failed to log out');
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
};

module.exports = { getHomePage, getMoviesPage, getLoginPage, postRegisterPage, getRegisterPage ,getDetailPageByMovieId, postLoginPage, postLogout};
