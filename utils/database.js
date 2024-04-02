const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql",
    database: "my_db",
    multipleStatements: true,
});
 

mysqlConnection.connect(function(err){
    if(err) throw err;
});
 
module.exports = mysqlConnection;