const { Pool } = require("pg");



const pool = new Pool({
        // we don't have to actually have an object here because postgres will know that by default it will look for environment variables in a .env file to find credentials
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT, // default port
    }
);

module.exports = {
    query: (text, params) => pool.query(text, params),
};