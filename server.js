require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

const loginRoutes = require('./routes/loginRoutes');
const movieRoutes = require('./routes/movieRoutes');
const episodeRoutes = require('./routes/episodeRoutes');
const userRoutes = require('./routes/userRoutes');

// Middleware
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: true }));
// app.use(session({
//     secret: 'cyber cadt idri idt idg',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
//   }));
//   // Configure flash middleware
// app.use(flash());
app.use(express.json());

app.use(session({ 
    secret:'cyber cadt idri idt idg', 
    saveUninitialized: true, 
    resave: true
})); 

// Configure flash middleware
app.use(flash());

// Make flash messages available in all views (with res.locals)
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});


app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views/index')); 

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
// app.use('/css', express.static('public/css'));

app.use('/uploads', express.static('public/uploads'));
app.use('/movies',movieRoutes);
app.use('/episodes', episodeRoutes);
app.use('/logins', loginRoutes);
app.use('/', userRoutes);
app.listen(PORT,()=>{
    console.log("server is running on port "+PORT);
});