const Movie = require("../models/productModel");
const upload = require('../config/multer');

exports.getAllProducts = async (req,res) => {
    try{
        const movies = await Movie.getAll();
        title = "List movies"
        res.render('product/index',{movies,title});
        
    }catch(err){
        res.status(500).send("Error fetching movies");
    }
};

exports.renderCreateForm = (req,res)=>{
    title = "New Movie"
    res.render('product/create',{title});
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
        res.redirect("/product");
    }catch(err){
        let backurl = '/product';
        req.flash('error', err.sqlMessage);
        return res.redirect(backurl);
    }
}

exports.getMovieById = async (req,res) => {
    try {
        const movies = await Movie.getById(req.params.id);
        title = "Show Movies";
        if (movies) {
          res.render('product/show', { movies,title });
        } else {
          res.status(404).send('movie not found');
        }
      } catch (err) {
        res.status(500).send('Error fetching movies');
      }
};

exports.renderEditForm = async (req, res) => {
    try {
      const movies = await Movie.getById(req.params.id);
      title = "Edit Movie";
      if (movies) {
        res.render('product/edit', { movies,title });
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
            const movies = await Movie.getById(req.params.id);
            image_path = movies.image;
            
        }
        await Movie.update(req.params.id, { title, description, image: image_path });
        
        res.redirect('/product');
    } catch (err) {
      res.status(500).send('Error updating movies');
    }
  };
  
  // Delete product
  exports.deleteMovie = async (req, res) => {
    try {
      await Movie.delete(req.params.id);
      res.redirect('/product');
    } catch (err) {
      res.status(500).send('Error deleting movie');
    }
  };