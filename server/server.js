require("dotenv").config();
const express = require("express");

// intiailize node app
const app = express();

// middleware
app.use((req, res, next) => {
    // res.status(404).json({
    //     status: 'fail'
    // });
});

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
app.get("/api/v1/restaurants/:restaurant_id", (req, res) => {
    console.log(req.params);
    // res.status(200).json({
    //     status: "success",
    //     data: {

    //     }
    // })
});

// create a restaurant
app.post("/api/v1/restaurants", (req, res) => {
    console.log(req);
});

// import port from dotenv
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
});
