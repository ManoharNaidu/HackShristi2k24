CREATE DATABASE rescued_animals;
USE rescued_animals;

CREATE TABLE animals (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  species VARCHAR(100) NOT NULL,
  description TEXT
);
