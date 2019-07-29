
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
  res.send("Hello World!");
}); // Main Route

// Local Server Listener

const port = 8081;
app.listen(port, "0.0.0.0", function() {
    console.log("Express Server is Running...");
});

/*
// Heroku Server Deployment
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Running Express Server...");
});
*/