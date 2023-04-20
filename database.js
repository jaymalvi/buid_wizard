const mysql = require('mysql2');
const dotenv = require('dotenv').config();

const pool = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'buildwizard'
});

module.exports = pool.promise();