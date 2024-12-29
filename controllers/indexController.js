const Movie = require("../models/movieModel");

exports.getListProduct = async (req,res) => {
    try{
        const movies = await Movie.getAll();
        const title = "List movies";
        res.render('movie/index',{movies,title});
    
    }catch(err){
        res.status(500).send("Error fetching movies");
    }
}