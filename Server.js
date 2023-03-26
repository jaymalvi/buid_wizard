const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
// const errorHandler = require('middleware/error-handler');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// global error handler
// app.use(errorHandler);

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'demo1'
// });

// connection.connect((error) => {
//   if (error) {
//     console.error('Error connecting to MySQL database:', error);
//   } else {
//     console.log('Connected to MySQL database!');
//   }
// });


// app.post('/category', (req, res) => {
//   const { name} = req.body;
//   const sql = `INSERT INTO category (name) VALUES (?)`;
//   connection.query(sql, [name], (err, result) => {
//     if (err) {
//       res.status(500).send(err.message);
//     } else {
//       res.json({ id: result.insertId });
//     }
//   });
// });

// app.post('/category', (req, res) => {
//   // extract form data
//   const category = req.body.category;


//   // define database query
//   const query = `INSERT INTO category (name) VALUES (?)`;

//   // execute query with form data
//   connection.query(query, [category], (err, result) => {
//     if (err) {
//       console.error(err);
//       res.sendStatus(500);
//       return;
//     }

//     res.sendStatus(200);
//   });
// });

app.set('views', 'views/');
// app.set('view engine', 'ejs');

// app.get('/', function(req, res) {
//   connection.query('SELECT * FROM users', function (error, results, fields) {
//     if (error) throw error;
//     res.render('users', { users: results });
//   });
// });

app.use(express.static(path.join(__dirname, 'public')));
//app.use('/adminlte', express.static(path.join(__dirname, 'node_modules/admin-lte')));

app.get('/', (req, res) => {
  res.render('pages/auth/login.ejs', { title: 'Component Craze' });
 });

app.get('/auth/register', (req, res) => {
  res.render('pages/auth/registration.ejs', { title: 'Component Craze' });
});

app.get('/auth/forgot-password', (req, res) => {
  res.render('pages/auth/forgot-password.ejs', { title: 'Component Craze' });
});

app.get('/auth/recover-password', (req, res) => {
  res.render('pages/auth/recover-password.ejs', { title: 'Component Craze' });
});

app.get('/dashboard', (req, res) => {
  res.render('pages/dashboard.ejs', { title: 'Component Craze' });
});

// app.get('/category', (req, res) => {
//     res.render('pages/category.ejs', { category: [] });
//   });

app.get('/category/addCategory', (req, res) => {
    res.render('pages/addCategory.ejs', { title: 'Component1111111111 Craze' });
  });

  app.get('/company', (req, res) => {
    res.render('pages/company.ejs', { title: 'Component Craze' });
  });

app.get('/company/addCompany', (req, res) => {
    res.render('pages/addCompany.ejs', { title: 'Component1111111111 Craze' });
  });

  app.get('/auth/login', (req, res) => {
    res.render('pages/', { title: 'Component Craze' });
  });

  app.get('/deliveryPerson', (req, res) => {
    res.render('pages/deliveryPerson.ejs', { title: 'Component Craze' });
  });

// Require employee routes
const categoryRoutes = require('./routes/categoryRoute');
const category = require('./db/models/category');

// using as middleware
app.use('/category', categoryRoutes)


app.listen(3000, () => {
  console.log('Server started on port 3000');
});
