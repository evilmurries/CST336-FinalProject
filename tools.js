
const request = require("request");
const mysql = require("mysql");

module.exports = {

// Create a connection to the database server
createConnection: function() {
    var conn = mysql.createPool({
        connectionLimit: 10,
        host: "us-cdbr-iron-east-02.cleardb.net",
        user: "b966e7405b082e",
        password: "e739afd6",
        database: "heroku_d27a5db666d1cf0"
    });
    return conn;
}
  
} // export