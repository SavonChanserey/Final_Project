const Login = require('../models/loginModel');

exports.getAllLogins = async (req, res) => {
    try {
        const logins = await Login.getAll();
        const title = "List Users";
        res.render('login/index', { logins, title });
    } catch (err) {
        res.status(500).send("Error fetching Users");
    }
};

exports.renderCreateForm = (req, res) => {
    const title = "Add New User";
    res.render('login/create', { title });
};


exports.createLogin = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        const { email, password } = req.body;

        if (!email || !password ) {
            console.log("Validation failed. Missing fields:", { email, password });
            return res.status(400).send("All fields are required.");
        }

        await Login.create({ email, password});
        res.redirect('/logins');
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send("Error creating user");
    }
};

exports.getLoginById = async (req, res) => {
    try {
        const login = await Login.getById(req.params.id);
        const title = "User Details";
        if (login) {
            res.render('login/show', { login, title });
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        res.status(500).send("Error fetching user");
    }
};

exports.renderEditForm = async (req, res) => {
    try {
        const login = await Login.getById(req.params.id);
        const title = "Edit User";
        if (login) {
            res.render('login/edit', { login, title });
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        res.status(500).send("Error fetching user");
    }
};

exports.updateLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        await Login.update(req.params.id, { email, password});
        res.redirect('/logins');
    } catch (err) {
        res.status(500).send("Error updating User");
    }
};

exports.deleteLogin = async (req, res) => {
    try {
        await Login.delete(req.params.id);
        res.redirect('/logins');
    } catch (err) {
        res.status(500).send("Error deleting user");
    }
};
