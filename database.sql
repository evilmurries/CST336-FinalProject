
USE heroku_d27a5db666d1cf0;

-- Create Tables

CREATE TABLE animals (
	id INT PRIMARY KEY AUTO_INCREMENT,
    animal VARCHAR(100)
);

CREATE TABLE pets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50),
  animal_type INT FOREIGN KEY,
  adoption_fee DECIMAL(6, 2),
  location VARCHAR(250),
  image VARCHAR(200),
  description VARCHAR(500),
  CONSTRAINT animal_type_fk FOREIGN KEY (animal_type) REFERENCES animals(id)
);

CREATE TABLE administration (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(25) NOT NULL,
  name VARCHAR(25) NOT NULL
);

-- Insert Data | Everyone update your values here

INSERT INTO administration VALUES ("cpiwarski", "internetprog", "Chris");
INSERT INTO administration VALUES ("cpiwarski", "internetprog", "Chris");
INSERT INTO administration VALUES ("cpiwarski", "internetprog", "Chris");
INSERT INTO administration VALUES ("cpiwarski", "internetprog", "Chris");

INSERT INTO animals VALUES ("dog");
INSERT INTO animals VALUES ("cat");
INSERT INTO animals VALUES ("horse");
INSERT INTO animals VALUES ("guinea pig");
INSERT INTO animals VALUES ("rabbit");
INSERT INTO animals VALUES ("alligator");