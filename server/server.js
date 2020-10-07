require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const db = require("./db"); // you don't need to use /index.js (looks for it by default)
const cors = require("cors");

// intiailize node app
const app = express();

// middleware
app.use(cors()); // avoid cors error
app.use(express.json());

// routes
// get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        // const results = db.query("SELECT * FROM restaurants;") // returns a promise
        // const results = await db.query("SELECT * FROM restaurants;") // use async so we can catch the result whenever the query finishes
        const restaurantRatingsData = await db.query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;");
        // console.log("results", results);
        console.log("restaurantRatings", restaurantRatingsData);

        res.status(200).json({
            status: "success",
            results: restaurantRatingsData.rows.length,
            data: {
                restaurants: restaurantRatingsData.rows
            }
        });
    } catch (err) {
        console.log(err);
    }
});

// get a single restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const restaurant = await db.query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE ID = $1;", [
            req.params.id
        ]);

        const reviews = await db.query("SELECT * FROM reviews WHERE restaurant_id= $1", [
            req.params.id
        ]);
        console.log(reviews);

        // const results = await db.query("SELECT $2 FROM restaurants WHERE id= $1", [req.params.id, 'name']); // could use this to just get the name of the entry in our DB table where name='name'
        // console.log(restaurant.rows[0]);
        res.status(200).json({
            status: "success",
            results: restaurant.rows.length,
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows
            },
        });
    }
    catch(err) {
        console.log(err);
    }
});

// create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
    try {
        const results = await db.query(" INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *;", [req.body.name, req.body.location, req.body.price_range]);
        // console.log(results.rows[0]);
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            }
        })
    } catch (err) {
        console.log(err);
    }
});

// Update Restaurants
app.put("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *;", [req.body.name, req.body.location, req.body.price_range, req.params.id]);
        // console.log(req.params.id);
        // console.log(results.rows[0]);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            }
        })
    } catch(err) {
        console.log(err);
    }
});

// Delete Restaurants
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("DELETE FROM restaurants WHERE id = $1", [req.params.id]);
        res.status(204).json({
            status: "success",
        });
    } catch(err) {
        console.log(err);
    }
});

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
    try {
        const newReview = await db.query('INSERT INTO reviews (restaurant_id, name, review_text, rating) values ($1, $2, $3, $4) returning *;', [
            req.params.id, req.body.name, req.body.review_text, req.body.rating
        ]);
        console.log(newReview);
        res.status(201).json({
            status: 'success',
            data: {
                review: newReview.rows[0]
            }
        })
    } catch(err) {
        console.log(err);
    }
});

// import port from dotenv
const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
});
