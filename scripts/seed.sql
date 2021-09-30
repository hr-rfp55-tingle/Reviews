DROP DATABASE IF EXISTS reviews_service;
CREATE DATABASE reviews_service;

\c reviews_service;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(31),
  slogan VARCHAR(255),
  description VARCHAR,
  category VARCHAR(31),
  default_price INTEGER
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  rating INTEGER,
  date BIGINT,
  summary VARCHAR(255),
  body VARCHAR,
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name VARCHAR(31),
  reviewer_email VARCHAR(63),
  response VARCHAR,
  helpfulness INTEGER
);

CREATE TABLE characteristics (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  name VARCHAR(15)
);

CREATE TABLE characteristics_reviews (
  id SERIAL PRIMARY KEY,
  characteristic_id INTEGER REFERENCES characteristics(id),
  review_id INTEGER REFERENCES reviews(id),
  value INTEGER
);

CREATE TABLE reviews_photos (
  id SERIAL PRIMARY KEY,
  review_id INTEGER REFERENCES reviews(id),
  url VARCHAR(255)
);

COPY products
FROM '/home/cory/Github/SDC/SDC_App_data/product.csv'
DELIMITER ',' CSV HEADER;

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