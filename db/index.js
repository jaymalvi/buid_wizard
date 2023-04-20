const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
// const { config } = require('../config');
const mysql2 = require('mysql2');
const dotenv = require('dotenv').config();

const pool = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'buildwizard'
});

module.exports = pool.promise();


const basename = path.basename(__filename);
const db = {};
const sequelize = new Sequelize("buildwizard", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
  // Using mysql2 connection for Sequelize
  dialectModule: mysql2,
  dialectOptions: {
  connection: pool
  }
});

// Testing connection for mysql2
pool.connect((err) => {
  if (err) {
    console.error('Error connecting to mysql2 database', err);
  } else {
    console.log('Connected to mysql2 database!');
  }
});


sequelize.authenticate()
  .then(() => {
    console.log('Connected to Sequelize database!');
  })
  .catch((err) => {
    console.error('Error connecting to Sequelize database', err);
  });





// const sequelize = new Sequelize(config.db_url); //  postgres

fs.readdirSync(path.join(__dirname, 'models'))
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    // eslint-disable-next-line dot-notation
    const model = require(path.join(__dirname, 'models', file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
