require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const db = require("./db"); // you don't need to use /index.js (looks for it by default)

// intiailize node app
const app = express();

// middleware
app.use(express.json());

// routes
// get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        // const results = db.query("SELECT * FROM restaurants;") // returns a promise
        const results = await db.query("SELECT * FROM restaurants;") // use async so we can catch the result whenever the query finishes
        console.log(results);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurant: results.rows
            }
        });
    } catch (err) {
        console.log(err);
    }
});

// get a single restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM restaurants WHERE id= $1", [req.params.id]);
        // const results = await db.query("SELECT $2 FROM restaurants WHERE id= $1", [req.params.id, 'name']); // could use this to just get the name of the entry in our DB table where name='name'
        console.log(results.rows[0]);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurant: results.rows[0]
            }
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
        console.log(results.rows[0]);
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
        console.log(results.rows[0]);
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

// import port from dotenv
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
});
