DROP DATABASE IF EXISTS review_db;

CREATE DATABASE review_db;

USE review_db;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  name text,
  photo text,
  PRIMARY KEY (id)
);

CREATE TABLE listings (
  id int NOT NULL AUTO_INCREMENT,
  name text,
  PRIMARY KEY (id)
);

CREATE TABLE reviews (
  id int NOT NULL AUTO_INCREMENT,
  listing_id int NOT NULL,
  user_id int NOT NULL,
  accuracy DECIMAL(2,1) NOT NULL,
  communication DECIMAL(2,1) NOT NULL,
  cleanliness DECIMAL(2,1) NOT NULL, 
  location DECIMAL(2,1) NOT NULL,
  check_in DECIMAL(2,1) NOT NULL,
  _value DECIMAL(2,1) NOT NULL,
  _date datetime NOT NULL,
  content text,
  is_reported boolean NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (listing_id) REFERENCES listings(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);