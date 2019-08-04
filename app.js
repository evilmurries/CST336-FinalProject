
// Set up Express
const express = require("express");
const session = require("express-session");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(session({'secret':'343ji43j4n3jn4jk3n'}));

// Other Dependencies
const request = require("request");
const mysql = require("mysql");
const tools = require("./tools.js");

// Routes

app.get("/", function(req, res) {
  res.render("index");
}); // Main Route

app.get("/adopt", function(req, res) {
 // res.render("index", {"imageURLs": imageURLs});
  res.render("adopt");
  //res.render("adopt", {"image": image});
});// populates page of mysql images

app.get("/login", function(req, res) {
  res.render("login");
});// login page

app.get("/admin", function(req, res) {
  res.render("admin");
});// admin work page

app.get("/api/getimage", function(req, res) {
  var conn = tools.createConnection();
  //var name = "Charles"
  var sql = "SELECT image FROM pets WHERE pet_name = ?";
  var sqlParams = req.query.pet_name;
  //var sqlParams = 'Charles';
  conn.query(sql, sqlParams, function(err, result) {
  //conn.query(sql, function(err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  }); //query

  
  
  
  

}); // displayimage TEST

// Local Server Listener

const port = 8081 || process.env.PORT;
const serial = "0.0.0.0" || process.env.IP;


app.listen(port, serial, function() {
    console.log("Express Server is Running...");
}); 

/*
// Heroku Server Deployment
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Running Express Server...");
});
*/