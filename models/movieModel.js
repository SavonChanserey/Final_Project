const db = require("../config/database");

class Movie {
    static async getAll(){
        const [rows] = await db.query('SELECT * FROM movies');
        return rows;
    }

    static async create(data){
        const result = await db.query("INSERT INTO movies (title,description,image) VALUE (?,?,?)",[data.title,data.description,data.image]);
        return result;
    }

    static async getById(id) {
        try {
            console.log('Fetching movie with ID:', id);  // Log the ID we are querying
            const [rows] = await db.query('SELECT * FROM movies WHERE id = ?', [id]);
            
            // Log the result of the query
            console.log('Query Result:', rows);
    
            if (rows.length === 0) {
                console.log('Movie not found');
                return null;  // No movie found, return null
            }
            return rows[0];  // Movie found, return the first row
        } catch (err) {
            console.error('Error fetching movie by ID:', err);  // Log any error from the database query
            throw err;  // Rethrow the error to be handled in the controller
        }
    }
    
    static async update(id, data) {
        const result = await db.query('UPDATE movies SET title = ?, description = ?, image = ? WHERE id = ?', [data.title,data.description,data.image, id]);
        return result;
    }
    
    static async delete(id) {
        const result = await db.query('DELETE FROM movies WHERE id = ?', [id]);
        return result;
    }
}


module.exports = Movie;