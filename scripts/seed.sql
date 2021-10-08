DROP DATABASE IF EXISTS reviews_service;
CREATE DATABASE reviews_service;

\c reviews_service;

CREATE TABLE products (
  id SERIAL PRIMARY KEY
);

GRANT ALL ON products TO atelier;

CREATE TABLE reviews (
  id BIGSERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  rating INTEGER,
  date BIGINT,
  summary VARCHAR(255),
  body VARCHAR,
  recommend BOOLEAN,
  reported BOOLEAN DEFAULT false,
  reviewer_name VARCHAR(31),
  reviewer_email VARCHAR(63),
  response VARCHAR,
  helpfulness INTEGER DEFAULT 0
);

GRANT ALL ON reviews TO atelier;

CREATE TABLE characteristics (
  id BIGSERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  name VARCHAR(15)
);

GRANT ALL ON characteristics TO atelier;

CREATE TABLE characteristic_review (
  id BIGSERIAL PRIMARY KEY,
  characteristic_id INTEGER REFERENCES characteristics(id),
  review_id INTEGER REFERENCES reviews(id),
  value REAL
);

GRANT ALL ON characteristic_review TO atelier;

CREATE TABLE reviewsPhotos (
  id BIGSERIAL PRIMARY KEY,
  review_id INTEGER REFERENCES reviews(id),
  url VARCHAR(255)
);

GRANT ALL ON reviewsPhotos TO atelier;

COPY products
FROM '/docker-entrypoint-initdb.d/SDC_App_data/product_id.csv'
DELIMITER ',' CSV HEADER;

CREATE INDEX ON products USING hash(id);
SELECT setval('products_id_seq', max(id)) FROM products;

COPY reviews
FROM '/docker-entrypoint-initdb.d/SDC_App_data/reviews.csv'
DELIMITER ',' CSV HEADER;

CREATE INDEX ON reviews USING hash(id);
CREATE INDEX ON reviews USING hash(product_id);
SELECT setval('reviews_id_seq', max(id)) FROM reviews;

COPY characteristics
FROM '/docker-entrypoint-initdb.d/SDC_App_data/characteristics.csv'
DELIMITER ',' CSV HEADER;

CREATE INDEX ON characteristics USING hash(id);
CREATE INDEX ON characteristics USING hash(product_id);
SELECT setval('characteristics_id_seq', max(id)) FROM characteristics;

COPY characteristic_review
FROM '/docker-entrypoint-initdb.d/SDC_App_data/characteristic_reviews.csv'
DELIMITER ',' CSV HEADER;

CREATE INDEX ON characteristic_review USING hash(characteristic_id);
CREATE INDEX ON characteristic_review USING hash(review_id);
SELECT setval('characteristic_review_id_seq', max(id)) FROM characteristic_review;

COPY reviewsPhotos
FROM '/docker-entrypoint-initdb.d/SDC_App_data/reviews_photos.csv'
DELIMITER ',' CSV HEADER;

CREATE INDEX ON reviewsPhotos USING hash(review_id);
SELECT setval('reviewsPhotos_id_seq', max(id)) FROM reviewsPhotos;

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO atelier;
