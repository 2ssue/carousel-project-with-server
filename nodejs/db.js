const mysql = require('mysql2/promise');

class DatabaseManager{
    constructor(dbpool, tableName){
        this.dbpool = mysql.createPool(dbpool);
        this.table = tableName;
    }

    changeUseTable(tableName){
        this.table = tableName;
    }

    async connect(){
        return this.dbpool.getConnection(async conn => conn);
    }

    async select(column='*', condition){
        try{
            const connection = await this.connect().then(res => res);
            try{
                condition = condition?' WHERE '+ condition:'';
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
    async update(column, conditionList, changing){
        if(!column || !conditionList) return;
        if(typeof changing === undefined) return;
        try{
            const connection = await this.connect().then(res => res);
            try{
                conditionList.forEach(async function(element) {
                    const query = `UPDATE ${this.table} SET ${column}=${changing} WHERE ${element}`;
                    const result = await connection.query(query);
                    connection.release();
                    return result;
                }.bind(this));
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
    async insert(column='*', values){
        if(!values) return;
        try{
            const connection = await this.connect().then(res => res);
            try{
                const query = `INSERT INTO ${this.table}(${column}) VALUES(${values})`;
                const result = await connection.query(query);
                connection.release();
                return result;
            }catch(err){
                console.log('[INSERT]Query error');
                console.log(err);
                connection.release();
                return false;
            }
        }catch(err){
            console.log('[INSERT]DB error');
            return false;
        }
    }
}


module.exports = DatabaseManager;