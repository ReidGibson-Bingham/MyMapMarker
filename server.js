// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

const pool = new Pool({
  user: 'jaspersm1',
  password: 'TenaCityUX',
  host: 'localhost',
  database: 'midterm'
});

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(expressLayouts);
app.set('layout', './layouts/full-width');
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index", { title: 'Home Page', layout: './layouts/full-width' });
});

app.get("/allEats", (req, res) => {
  res.render("allEats", { title: 'All Babies', layout: './layouts/full-width' });
});

app.get("/favoriteEats", (req, res) => {
  res.render("favoriteEats", { title: 'New Rescue', layout: './layouts/full-width' });
});

pool.query(
  "INSERT INTO maps(title) VALUES('Pool.query test');",
  (err, res) => {
    // console.log(err, res);
  }
);

pool.query(
  "SELECT * FROM maps;",
  (err, res) => {
    // console.log(err, res);

  }
);


app.get("/", (req, res) => {
  const input = req.query.text;

  // console.log("req.query.text: ", input);
  // console.log("test route");
  // console.log("req:", req);
  pool.query(
    `INSERT INTO points(title) VALUES('${input}')RETURNING *`,
    (err, res) => {

      console.log("input into database:", input);
      // console.log("res:", res);
    }
  );

  res.render("index");

});
app.post("/", (req, res) => {
  // console.log("req.body:", req.body);
  // console.log("JSON req.body:", JSON.parse(req.body.position));
  let pos = JSON.parse(req.body.position);// for some reason i need to store the position into a variable to extract the latitude and longitude keys
  // let title = JSON.parse(req.body.title);
  console.log("latitude", pos.lat);
  console.log("longitude", pos.lng);
  // const input = req.body.position;
  pool.query(
    `INSERT INTO points(title, latitude, longitude)
    VALUES(${pos}, ${pos.lat}, ${pos.lng})`,
    (err, res) => {
      // console.log("promise res:", res);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


/* .env file
add below to your .env file
GOOGLE_MAP_API_KEY=AIzaSyBWxHpGLzdtUW8alNMHhfiQgSHpPW6vsZk */
