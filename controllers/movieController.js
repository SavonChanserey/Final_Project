const Movie = require("../models/movieModel");
const upload = require('../config/multer');

exports.getAllMovies = async (req,res) => {
    try{
        const movies = await Movie.getAll();
        title = "List movies"
        res.render('movie/index',{movies,title});
        
    }catch(err){
        res.status(500).send("Error fetching movies");
    }
};

exports.renderCreateForm = (req,res)=>{
    title = "Add New Movie"
    res.render('movie/create',{title});
};

exports.createMovie = async(req,res)=>{
    try{
        const { title, description} = req.body;
        let image_path = "";
        // If there's an uploaded file, set the image path
        if (req.file) {
            image_path = `/uploads/${req.file.filename}`;
        }
        await Movie.create({ title, description, image: image_path });
        res.redirect("/movies");
    }catch(err){
        let backurl = '/movies';
        req.flash('error', err.sqlMessage);
        return res.redirect(backurl);
    }
}

exports.getMovieById = async (req,res) => {
    try {
        const movie = await Movie.getById(req.params.id);
        const episodes = await Episode.getAllByMovieId(req.params.id);
        const title = "Movie Details";
        if (movie) {
          res.render('movie/show', { movie,title });
        } else {
          res.status(404).send('movie not found');
        }
      } catch (err) {
        res.status(500).send('Error fetching movies');
      }
};

exports.renderEditForm = async (req, res) => {
    try {
      const movie = await Movie.getById(req.params.id);
      const title = "Edit Movie";
      if (movie) {
        res.render('movie/edit', { movie,title });
      } else {
        res.status(404).send('Movie not found');
      }
    } catch (err) {
      res.status(500).send('Error fetching movies');
    }
};

// Update product
exports.updateMovie = async (req, res) => {
    try {
        const { title, description} = req.body;
        let image_path = "";

        if (req.file) {
            image_path = `/uploads/${req.file.filename}`;
        }
        else{
            const movie = await Movie.getById(req.params.id);
            image_path = movie.image;
            
        }
        await Movie.update(req.params.id, { title, description, image: image_path });
        
        res.redirect('/movies');
    } catch (err) {
      res.status(500).send('Error updating movies');
    }
  };
  
  // Delete product
  exports.deleteMovie = async (req, res) => {
    try {
      await Movie.delete(req.params.id);
      res.redirect('/movies');
    } catch (err) {
      res.status(500).send('Error deleting movie');
    }
  };
