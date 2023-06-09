const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const db = require('./db');
var session = require('express-session')
var session1 = require('express-session')
var MemoryStore = require('memorystore')(session)
const supplierController = require('./controllers/supplierController');
//const expressLayouts = require('express-ejs-layouts');
// const MySqlStore = require('express-mysql-session')(session1);
// const mydb = require('./db');


const customerRoutes = require('./routes/customer');

//app.use(expressLayouts);
app.set('view engine', 'ejs');
// app.set('layout', './layouts/full-width');
app.use(express.static(__dirname + '/public/'));
// var sessionStore = new MySqlStore({}, mydb);
// app.use(session1({
//     secret: 'any Secret',
//     store: sessionStore,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: null }
// }));



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



app.set("views", "views/");

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

app.get("/viewItem", async (req, res) => {
    const ShowItemProvidedBySupllier= await db.supplier.findAll({raw :true});
    console.log(ShowItemProvidedBySupllier); 
    return res.render('pages/cabinetItem.ejs', { ShowItemProvidedBySupllier , userData: req.session && req.session.user ? req.session.user : null });
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

// app.get("/customerOrder", (req, res) => {
//   res.render("pages/customerOrder.ejs", { title: "Component Craze" , userData: req.session && req.session.user ? req.session.user : null });
// });

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

app.get("/order", (req, res) => {
  res.render("pages/supllier/order.ejs", { title: "Component Craze" , userData: req.session && req.session.user ? req.session.user : null });
});

// build wizard (customer side's routes)
app.get("/home-page", (req, res) => {
  res.render("pages/build-wizard/home-page.ejs", { title: "Component Craze" , userData: req.session && req.session.user ? req.session.user : null });
});

app.get('/item_buy/:id', supplierController.BuyItem);


// Require employee routes
const offerRoutes = require("./routes/offer-route");
const offer = require("./db/models/offer");
const cabinet = require("./routes/cabinet-route");
const supplier = require("./routes/supplier-route");
const user = require("./routes/user-route");
const order = require("./routes/order-route");

// using as middleware
app.use("/offer", offerRoutes);
app.use("/cabinet", cabinet);
app.use("/supplier", supplier);
app.use("/user", user);
app.use("/orders", order);
app.use(customerRoutes.router);


app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
