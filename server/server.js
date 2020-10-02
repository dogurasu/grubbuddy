require("dotenv").config();
const express = require("express");

// intiailize node app
const app = express();

// import port from dotenv
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`)
});
