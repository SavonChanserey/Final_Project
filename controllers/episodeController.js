const Episode = require('../models/episodeModel');
const upload = require('../config/multer');
exports.getAllEpisodes = async (req, res) => {
    try {
        const episodes = await Episode.getAll();
        const title = "List Episodes";
        res.render('episode/index', { episodes, title });
    } catch (err) {
        res.status(500).send("Error fetching episodes");
    }
};

exports.renderCreateForm = (req, res) => {
    const title = "Add New Episode";
    res.render('episode/create', { title });
};


exports.createEpisode = async (req, res) => {
    try {
        const { episode, movie_id, link } = req.body;

        if (!episode || !movie_id || !link) {
            return res.status(400).send("All fields are required.");
        }

        await Episode.create({ episode, movie_id, link });
        res.redirect('/episodes');
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send("Error creating episode");
    }
};

exports.getEpisodeById = async (req, res) => {
    try {
        const episode = await Episode.getById(req.params.id);
        const title = "Episode Details";
        if (episode) {
            res.render('episode/show', { episode, title });
        } else {
            res.status(404).send("Episode not found");
        }
    } catch (err) {
        res.status(500).send("Error fetching episode");
    }
};

exports.renderEditForm = async (req, res) => {
    try {
        const episode = await Episode.getById(req.params.id);
        const title = "Edit Episode";
        if (episode) {
            res.render('episode/edit', { episode, title });
        } else {
            res.status(404).send("Episode not found");
        }
    } catch (err) {
        res.status(500).send("Error fetching episode");
    }
};

exports.updateEpisode = async (req, res) => {
    try {
        const { episode, movie_id, link } = req.body;
        await Episode.update(req.params.id, { episode, movie_id, link });
        res.redirect('/episodes');
    } catch (err) {
        res.status(500).send("Error updating episode");
    }
};

exports.deleteEpisode = async (req, res) => {
    try {
        await Episode.delete(req.params.id);
        res.redirect('/episodes');
    } catch (err) {
        res.status(500).send("Error deleting episode");
    }
};
