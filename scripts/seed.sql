DROP DATABASE IF EXISTS reviews_service;
CREATE DATABASE reviews_service;

\c reviews_service;

CREATE TABLE products (
  id SERIAL PRIMARY KEY
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  rating INTEGER,
  date BIGINT,
  summary VARCHAR,
  body VARCHAR,
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name VARCHAR,
  reviewer_email VARCHAR,
  response VARCHAR,
  helpfulness INTEGER
);

CREATE TABLE characteristics (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  name VARCHAR
);

CREATE TABLE characteristics_reviews (
  id SERIAL PRIMARY KEY,
  characteristic_id INTEGER,
  review_id INTEGER,
  value INTEGER
);

CREATE TABLE reviews_photos (
  id SERIAL PRIMARY KEY,
  review_id INTEGER,
  url VARCHAR
);

COPY reviews
FROM '/home/cory/Github/SDC/SDC_App_data/reviews.csv'
DELIMITER ',' CSV HEADER;

COPY characteristics
FROM '/home/cory/Github/SDC/SDC_App_data/characteristics.csv'
DELIMITER ',' CSV HEADER;

COPY characteristics_reviews
FROM '/home/cory/Github/SDC/SDC_App_data/characteristic_reviews.csv'
DELIMITER ',' CSV HEADER;

COPY reviews_photos
FROM '/home/cory/Github/SDC/SDC_App_data/reviews_photos.csv'
DELIMITER ',' CSV HEADER;