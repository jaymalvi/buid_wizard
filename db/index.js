const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
// const { config } = require('../config');

const basename = path.basename(__filename);
const db = {};
const sequelize = new Sequelize("buildwizard", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
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
// const mysql = require('mysql');
//local mysql db connection
// const connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'demo1'
// });

// connection.connect((error) => {
//     if (error) {
//       console.error('Error connecting to MySQL database:', error);
//     } else {
//       console.log('Connected to MySQL database!');
//     }
//   });

// module.exports = connection;