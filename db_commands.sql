-- for help \?
-- list database \l
-- connect to database \c
-- list all tables \d

-- SQL commands
-- Create database - CREATE DATABASE database_name;
-- Create table:
CREATE TABLE products (
    id INT,
    name VARCHAR(50),
    price INT,
    on_sale BOOLEAN
);

ALTER TABLE products ADD COLUMN featured boolean;
ALTER TABLE products DROP COLUMN featured;

CREATE TABLE restaurants (
    id INT, -- it's actually bad to do it like this
    name VARCHAR(50),
    location VARCHAR(50),
    price_range INT
);

CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL PRIMARY KEY,
        -- this produces a BIG integer where each time we create a new entry, it's going to increment it by 1 for us - ensures a unique id
        -- NOT NULL is a constraint that tells us that this field cannot be NULL
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check(price_range >= 1 and price_range <= 5)
);

INSERT INTO restaurants (id, name, location, price_range) values (123, 'mcdonalds', 'new york', 3);

-- create the reviews table (before foreign keys)
CREATE TABLE reviews(
    id BIGSERIAL NOT NULL PRIMARY KEY,
        -- primary key to uniquely identify this review
    name VARCHAR(30) NOT NULL,
    review_text TEXT NOT NULL,
    rating INT check(rating >= 1 and rating <= 5)
);

-- create the reviews table (now including foreign keys)
CREATE TABLE reviews(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),  
    name VARCHAR(30) NOT NULL,
    review_text TEXT NOT NULL,
    rating INT check(rating >= 1 and rating <= 5)
);

-- intricate sql query for restaurants and their review counts and average reviews
SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;

-- intricate sql query for one specific restaurant w/ specific ID
SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE ID = $1;