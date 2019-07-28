// Set up Express
const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

// Other Dependencies
const request = require("request");
const mysql = require("mysql");
const tools = require("./tools.js");

// Routes