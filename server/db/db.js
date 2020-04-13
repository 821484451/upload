const mysql = require('mysql');

// 创建连接池
const connection = mysql.createConnection({
    host: "123.56.119.87",
    user: "root",
    password: "199336",
    database: "study"
});
connection.connect(function(err) {
    if (err) {
        console.log('err connecting:' + err);
        return
    };
    console.log('mysql连接成功!');
});
module.exports = connection;