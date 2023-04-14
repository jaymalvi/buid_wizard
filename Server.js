const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const db = require('./db');
var session = require('express-session')
var MemoryStore = require('memorystore')(session)


function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
}


app.use(session({
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  resave: false,
  saveUninitialized: true,
  secret: 'build_wizard_03'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


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

app.set("views", "views/");
// app.set('view engine', 'ejs');

// app.get('/', function(req, res) {
//   connection.query('SELECT * FROM users', function (error, results, fields) {
//     if (error) throw error;
//     res.render('users', { users: results });
//   });
// });

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

//app.use('/adminlte', express.static(path.join(__dirname, 'node_modules/admin-lte')));

// Authentication  Routes
app.get("/", (req, res) => {
  res.render("pages/auth/login.ejs", { title: "Component Craze" , userData: req.session && req.session.user ? req.session.user : null });
});

// Route for logging in and receiving JWT token
app.post("/login", async (req, res) => {
  // Check credentials (in this example, just hard-coded values)
  console.log(req.body)
  const user = await db.user.findOne({
    where: { email: req.body.email },
    raw: true,
  });

  console.log(user)

  if (user) {
    if (req.session) {
      req.session.user = user;
    }
    if (user.role === "Admin") {
      // Admin user, redirect to admin dashboard
      return res.redirect("/dashboard");
    } else if (user.role === "Delivery Person") {
      // Delivery person, redirect to delivery dashboard
      return res.redirect("/user");
    } else if (user.role === "Technical Team") {
      // Technical team member, redirect to technical dashboard
      return res.redirect("/offer");
    }
  } else {
    const supplier = await db.supplier.findOne({
      where: { Email: req.body.email },
      raw: true,
    });
    if (req.session && supplier) {
      req.session.user = supplier;
    }

    if (supplier) {
      return res.redirect("/sup_dashborad");
    } else {
      // User not recognized, show error message
      return res.render("pages/auth/login.ejs", {
        error: "Invalid email or password",
        email: req.body.email,
        password: req.body.password,
      });
    }
  }

  
});


app.get("/auth/register", (req, res) => {
  res.render("pages/auth/registration.ejs", { title: "Component Craze" , userData: req.session && req.session.user ? req.session.user : null });
});

app.get("/auth/forgot-password", (req, res) => {
  res.render("pages/auth/forgot-password.ejs", { title: "Component Craze" , userData: req.session && req.session.user ? req.session.user : null });
});

app.get("/auth/recover-password", (req, res) => {
  res.render("pages/auth/recover-password.ejs", { title: "Component Craze" , userData: req.session && req.session.user ? req.session.user : null });
});

// main Admin (build wizard) routes
app.get("/dashboard", (req, res) => {
  res.render("pages/dashboard.ejs", { title: "Component Craze", userData: req.session && req.session.user ? req.session.user : null });
});

// app.get('/category', (req, res) => {
//     res.render('pages/category.ejs', { category: [] });
//   });

// app.get('/category/addCategory', (req, res) => {
//     res.render('pages/addCategory.ejs', { title: 'Component1111111111 Craze' });
//   });

app.get("/company", (req, res) => {
  res.render("pages/company.ejs", { title: "Component Craze" , userData: req.session && req.session.user ? req.session.user : null });
});

app.get("/company/addCompany", (req, res) => {
  res.render("pages/addCompany.ejs", { title: "Component1111111111 Craze" , userData: req.session && req.session.user ? req.session.user : null });
});

app.get("/deliveryPerson", (req, res) => {
  res.render("pages/deliveryPerson.ejs", { title: "Component Craze", userData: req.session && req.session.user ? req.session.user : null });
});

app.get("/supplier/addSupplier", (req, res) => {
  res.render("pages/addSupplier.ejs", { title: "Component Craze" , userData: req.session && req.session.user ? req.session.user : null });
});

app.get("/user/addUser", (req, res) => {
  res.render("pages/addUser.ejs", { title: "Component Craze" , userData: req.session && req.session.user ? req.session.user : null });
});

// app.get("/supplier/viewlist", (req, res) => {
//   res.render("pages/viewCabinet.ejs", { title: "Component Craze" , userData: req.session && req.session.user ? req.session.user : null });
// });

// app.get('/offer', (req, res) => {
//   res.render('pages/offer.ejs', { title: 'Component Craze' });
// });

app.get("/offer/addOffer", (req, res) => {
  res.render("pages/addOffer.ejs", { title: "Component Craze" , userData: req.session && req.session.user ? req.session.user : null });
});

// Supplier's Routes
app.get("/sup_dashborad", (req, res) => {
  res.render("pages/supllier/dashboard.ejs", { title: "Component Craze", userData: req.session && req.session.user ? req.session.user : null });
});

app.get("/addItems", (req, res) => {
  res.render("pages/supllier/addItems.ejs", { title: "Component Craze" , userData: req.session && req.session.user ? req.session.user : null });
});

// build wizard (customer side's routes)
app.get("/home-page", (req, res) => {
  res.render("pages/build-wizard/home-page.ejs", { title: "Component Craze" , userData: req.session && req.session.user ? req.session.user : null });
});

// Require employee routes
const offerRoutes = require("./routes/offer-route");
const offer = require("./db/models/offer");
const cabinet = require("./routes/cabinet-route");
const supplier = require("./routes/supplier-route");
const user = require("./routes/user-route");

// using as middleware
app.use("/offer", offerRoutes);
app.use("/cabinet", cabinet);
app.use("/supplier", supplier);
app.use("/user", user);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
