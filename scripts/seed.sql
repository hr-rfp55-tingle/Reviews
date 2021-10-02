DROP DATABASE IF EXISTS reviews_service;
CREATE DATABASE reviews_service;

\c reviews_service;

CREATE TABLE products (
  id SERIAL PRIMARY KEY
);

GRANT ALL ON products TO atelier;

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

GRANT ALL ON reviews TO atelier;

CREATE TABLE characteristics (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  name VARCHAR(15)
);

GRANT ALL ON characteristics TO atelier;

CREATE TABLE characteristic_review (
  id SERIAL PRIMARY KEY,
  characteristic_id INTEGER REFERENCES characteristics(id),
  review_id INTEGER REFERENCES reviews(id),
  value REAL
);

GRANT ALL ON characteristic_review TO atelier;

CREATE TABLE reviews_photos (
  id SERIAL PRIMARY KEY,
  review_id INTEGER REFERENCES reviews(id),
  url VARCHAR(255)
);

GRANT ALL ON reviews_photos TO atelier;

COPY products
FROM '/home/cory/Github/SDC/SDC_App_data/product_id.csv'
DELIMITER ',' CSV HEADER;

CREATE INDEX ON products(id);

COPY reviews
FROM '/home/cory/Github/SDC/SDC_App_data/reviews.csv'
DELIMITER ',' CSV HEADER;

CREATE INDEX ON reviews(id);
CREATE INDEX ON reviews(product_id);

COPY characteristics
FROM '/home/cory/Github/SDC/SDC_App_data/characteristics.csv'
DELIMITER ',' CSV HEADER;

CREATE INDEX ON characteristics(id);
CREATE INDEX ON characteristics(product_id);

COPY characteristic_review
FROM '/home/cory/Github/SDC/SDC_App_data/characteristic_reviews.csv'
DELIMITER ',' CSV HEADER;

CREATE INDEX ON characteristic_review(characteristic_id);
CREATE INDEX ON characteristic_review(review_id);

COPY reviews_photos
FROM '/home/cory/Github/SDC/SDC_App_data/reviews_photos.csv'
DELIMITER ',' CSV HEADER;

CREATE INDEX ON reviews_photos(review_id);