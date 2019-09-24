const mysql = require('mysql2/promise');

class DatabaseManager{
    constructor(dbpool, tableName){
        this.dbpool = mysql.createPool(dbpool);
        this.table = tableName;
    }

    async connect(){
        return this.dbpool.getConnection(async conn => conn);
    }

    async select(column='*', condition){
        try{
            const connection = await this.connect().then(res => res);
            try{
                condition = condition?' WHERE '+condition:'';
                const [rows] = await connection.query(`SELECT ${column} FROM ${this.table}${condition}`);
                connection.release();
                return rows;
            }catch(err){
                console.log('Query error');
                connection.release();
                return false;
            }
        }catch(err){
            console.log('DB error');
            return false;
        }
    }
}


module.exports = DatabaseManager;