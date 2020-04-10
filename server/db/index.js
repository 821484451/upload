const db = require('./db');

// 用promise封装一下一个高阶函数

const querySql = (db) => (sql) => new Promise((resolve, reject) => {
    db.query(sql, function(error, results){
        if (error) {
            reject(error)
            return false;
        };
        resolve(results);
    })
});

module.exports = querySql(db);