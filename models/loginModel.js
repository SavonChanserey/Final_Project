const db = require("../config/database");

class Login {
    static async getAll(){
        const [rows] = await db.query('SELECT * FROM logins');
        return rows;
    }

    static async create(data){
        const result = await db.query("INSERT INTO logins (email,password) VALUE (?,?)",[data.email,data.password]);
        return result;
    }

    static async getById(id) {
        const [rows] = await db.query('SELECT * FROM logins WHERE id = ?', [id]);
        return rows[0];
    }

    static async update(id, data) {
        const result = await db.query('UPDATE logins SET email = ?, password = ? WHERE id = ?', [data.email,data.password,id]);
        return result;
    }
    
    static async delete(id) {
        const result = await db.query('DELETE FROM logins WHERE id = ?', [id]);
        return result;
    }
}


module.exports = Login;