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
        const [rows] = await db.query('SELECT * FROM movies WHERE id = ?', [id]);
        return rows[0];
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