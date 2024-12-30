const users = []; // Temporary data store

// Example user model functions
const addUser = (user) => {
    users.push(user);
    return user;
};

const getUsers = () => {
    return users;
};

module.exports = { addUser, getUsers };
