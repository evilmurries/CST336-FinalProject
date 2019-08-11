// Set up Express
const express = require("express");
const session = require("express-session");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

// Other Dependencies
const request = require("request");
const mysql = require("mysql");
const bcrypt = require("bcrypt");


app.use(session({
  secret: "top secret!",
  resave: true,
  saveUninitialized: true
}));

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));

// Routes

// GET routes
app.get("/", function(req, res) {
  res.render("index");
}); // Main Route

app.get("/adopt", function(req, res) {

  var conn = createDBConnection();
  let sql = "SELECT DISTINCT animal_type FROM pets ORDER BY animal_type";
  //let sql = "SELECT animal from animals inner join pets on animals.id = pets.id";
  let animals = req.query.animal_type;
  

  conn.query(sql, function(err, result){
      if (err) throw err;
     res.render("adopt", {"rows": result});
      console.log(result);
    //console.log(animals);
    //console.log(image);
    }); // query
});// populates page of mysql images

app.get("/login", function(req, res) {
  res.render("login");
}); //login page

app.get("/logout", function(req, res) {
  req.session.destroy();
  res.redirect("/");
}); //logout

app.get("/myAccount",isAuthenticated, function(req,res) {
  res.render("account");
});


app.get("/displayPets", async function(req, res) {
  var conn = createDBConnection();
  let sql = "SELECT DISTINCT animal_type FROM pets ORDER BY animal_type";

    conn.query(sql, function(err, result){
      if (err) throw err;
      res.render("adopt", {"rows": result, "image": image});//render on certain page.
      console.log(result);
    }); // query
}); //display Pet Species

app.get("/api/getimage", function(req, res) {
  var conn = createDBConnection();
  let sql = "SELECT image FROM pets WHERE animal_type = ?";
  var sqlParams = req.query.animal_type; 
  //var sqlParams = req.query.pet_name;
  conn.query(sql, sqlParams, function(err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  }); //query
});


// POST routes

app.post("/admin", async function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  
  let result = await checkUsername(username);
  //console.dir(result);
  
  var dbPassword="";
  
  if(result.length > 0) {
    dbPassword= result[0].user_password;
  }
  
  let passwordMatch = await checkPassword(password, dbPassword)
  
  if (passwordMatch){
    console.log("passwordMatch detected");
    req.session.authenticated = true;
    res.render("admin");
  } else {
    console.log("passwordMatch NOT detected");
    req.session.authenticated = false;
    res.render("index", {"loginError":true});
  }
}); //admin work page

//
app.post("/generateReport", isAuthenticated, function (req, res) {
   var sql = "SELECT AVG(adoption_fee) AS avg, MIN(adoption_fee) as min, MAX(adoption_fee) as max FROM pets"
   var avg; 
    var promise = new Promise(function (resolve, reject) {
        let conn = createDBConnection();
        conn.connect(function (err) {
            if (err) throw err;
            conn.query(sql, [], function (err, rows, fields){//rows, fields) {
                if (err) throw err;
              var avg = rows[0].avg;
              var min = rows[0].min;
              var max = rows[0].max;
                console.log("Generate report: ", avg, min, max);
              
              getAnimalTypeCount().then(function(results){
                var animalIndexToName = ['dog(s)', 'cat(s)', 'horse(s)', 'guinea pig(s)', 'rabbit(s)', 'alligator(s)', 'otter(s)']
                console.log("result => {", results)
                for(var i = 0; i < results.length; i++){
                  results[i]["petname"] = animalIndexToName[i]
                }
                 res.render("welcome", {"avg" : avg, "min" : min, "max" : max,"results": results});    
                });
              });
            });//query
        });//connect
});//end of aggregates function

/* Update table route, user must fill in all fields */
app.post("/updateTable", isAuthenticated, function (req, res) {
    var petName = req.body.pet_name;
    var animalType  = req.body.animal_type;
    var adoptionFee = req.body.adoption_fee;
    var physicalLocation = req.body.location;
    var imageurl = req.body.imageURL;
    var desc = req.body.description;
    var sql = "UPDATE pets SET animal_type = ?, adoption_fee = ?, location = ?, image = ?, description = ? WHERE pet_name = ?" //adoption_fee, location, image, description VALUES(?,?,?,?,?,?) WHERE pet_name = ?"//"UPDATE pets(pet_name, animal_type, adoption_fee, location, image, description) VALUES(?,?,?,?,?,?) WHERE pet_name = ?";
    var promise = new Promise(function (resolve, reject) {
        let conn = createDBConnection();
        conn.connect(function (err) {
            if (err) throw err;
            conn.query(sql, [animalType,adoptionFee, physicalLocation, imageurl, desc, petName], function (err, rows, fields) {
                if (err) throw err;
                console.log("Update execution: ", rows, fields);
                res.render("welcome", {
                    sql: sql
                });
            });//query
        });//connect
    });//promise
});

/* Insert record route, user must fill in all fields */
app.post("/insertRecord", isAuthenticated, function (req, res) {
    var petName = req.body.pet_name;
    var animalType  = req.body.animal_type;
    var adoptionFee = req.body.adoption_fee;
    var physicalLocation = req.body.location;
    var imageurl = req.body.imageURL;
    var desc = req.body.description;
    var sql = "INSERT INTO pets(pet_name, animal_type, adoption_fee, location, image, description) VALUES(?,?,?,?,?,?)";
    var promise = new Promise(function (resolve, reject) {
        let conn = createDBConnection();
        conn.connect(function (err) {
            if (err) throw err;
            conn.query(sql, [petName, animalType, adoptionFee, physicalLocation, imageurl, desc
                            ], function (err, rows, fields) {
                if (err) throw err;
                console.log("Insert execution: ", rows, fields);
                res.render("welcome", {
                    sql: sql
                });
            });//query
        });//connect
    });//promise
});

/* Delete record route, delete a row based on pet name */
app.post("/deleteRecord", isAuthenticated, function (req, res) {

    var petName = req.body.pet_name;
    var sql = "DELETE FROM pets where pet_name = ?"

    var promise = new Promise(function (resolve, reject) {
        let conn = createDBConnection();
        conn.connect(function (err) {
            if (err) throw err;
            conn.query(sql, [petName], function (err, rows, fields) {
                if (err) throw err;
                console.log("Insert execution: ", rows, fields);
                res.render("welcome", {
                    sql: sql
                });
            });//query
        });//connect
    });//promise
});

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

// Helper Functions

/* 
* getAnimalTypeCount function
* @returns an array containing counts of all the animal types
*/
function getAnimalTypeCount(){
    var sql = "SELECT COUNT(animal_type) as howmany, animal_type FROM pets GROUP BY animal_type"
    return new Promise(function (resolve, reject) {
        let conn = createDBConnection();
        conn.connect(function (err) {
            if (err) throw err;
            conn.query(sql, [], function (err, rows, fields) {
                if (err) throw err;
                console.log("Generate report: ", rows, fields);
                resolve(rows)
                });
            });//query
        });//connect
    //});//promise
}

// Middleware function that keeps a user session active
function isAuthenticated(req, res, next) {
  if(!req.session.authenticated) {
    res.redirect('/');
  } else {
    next()
  }
}

// Checks the provided password against the database password for authentication
function checkPassword(password, dbPassword) {
  return new Promise( function(resolve, reject) {
    bcrypt.compare(password, dbPassword, function(err, result) {
      resolve(result);
    }); //bcrypt
  }); // promise
}

/**
* Checks whether the username exists in the database
* if found, returns corresponding record.
* @param {string} username
* @return {array of objects}
*/
function checkUsername(username){
  let sql = "SELECT * FROM administration WHERE user_name = ? ";
  return new Promise(function(resolve,reject){
    let conn = createDBConnection();
    conn.getConnection(function(err) {
      if (err) throw err;
      conn.query(sql, [username], function(err,rows,fields) {
        if (err) throw err;
        resolve(rows);
      });//query
    });//connect
  });//promise
}

// Create a connection to the database server
function createDBConnection() {
    var conn = mysql.createPool({
        connectionLimit: 10,
        host: "us-cdbr-iron-east-02.cleardb.net",
        user: "b966e7405b082e",
        password: "e739afd6",
        database: "heroku_d27a5db666d1cf0"
    });
    return conn;
}