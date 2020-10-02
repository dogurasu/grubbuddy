require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

// intiailize node app
const app = express();

// middleware
app.use(express.json());

// routes
// get all restaurants
app.get("/api/v1/restaurants", (req, res) => {
    console.log("route handler ran");
    res.status(200).json({
        status: "success",
        data: {
            restaurant: ["mcdonalds", "wendys"]
        }
    });
});

// get a single restaurant
app.get("/api/v1/restaurants/:id", (req, res) => {
    console.log(req.params);
    res.status(200).json({
        status: "success",
        data: {
            restaurant: "mcydees_get"
        }
    })
});

// create a restaurant
app.post("/api/v1/restaurants", (req, res) => {
    console.log(req.body);
    res.status(201).json({
        status: "success",
        data: {
            restaurant: "mcydees_create"
        }
    })
});

// Update Restaurants
app.put("/api/v1/restaurants/:id", (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    res.status(200).json({
        status: "success",
        data: {
            restaurant: "mcydees_update"
        }
    })
});

// Delete Restaurants
app.delete("/api/v1/restaurants/:id", (req, res) => {
    res.status(204).json({
        status: "success",
    });
});

// import port from dotenv
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
});
