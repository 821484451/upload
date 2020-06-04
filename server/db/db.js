const mysql = require('mysql');

// 创建连接池
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "199336",
    database: "study",
    connectionLimit: 10,
});
module.exports = pool;