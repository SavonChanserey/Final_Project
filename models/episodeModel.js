const db = require("../config/database");

class Episode {
    static async getAll(){
        const [rows] = await db.query('SELECT * FROM episodes');
        return rows;
    }

    static async create(data){
        const result = await db.query("INSERT INTO episodes (episode,movie_id,link) VALUE (?,?,?)",[data.episode,data.movie_id,data.link]);
        return result;
    }

    static async getById(id) {
        const [rows] = await db.query('SELECT * FROM episodes WHERE id = ?', [id]);
        return rows[0];
    }

    static async update(id, data) {
        const result = await db.query('UPDATE episodes SET episode = ?, movie_id = ?, link = ? WHERE id = ?', [data.episode,data.movie_id,data.link, id]);
        return result;
    }
    
    static async delete(id) {
        const result = await db.query('DELETE FROM episodes WHERE id = ?', [id]);
        return result;
    }
}


module.exports = Episode;