const db = require('./db');

// 用promise封装一下一个高阶函数

const querySql = (db) => (sql) => new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
        connection.query(sql, function(error, results){
            if (error) {
                reject(error)
                return false;
            };
            resolve(results);
            connection.release();
        });
    })  
    
});

module.exports = querySql(db);