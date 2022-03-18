// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "midterm",
});

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(expressLayouts);
app.set("layout", "./layouts/full-width");
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
// const usersRoutes = require("./routes/users");
// const widgetsRoutes = require("./routes/widgets");
const mapRoutes = require("./routes/map");
const pointRoutes = require("./routes/point");
const newMapRoutes = require("./routes/newMap");
//const descriptionRoutes = require("./routes/description");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
//app.use("/api/users", usersRoutes(db));
//app.use("/api/widgets", widgetsRoutes(db));
app.use("/api/routes/map", mapRoutes(pool));
app.use("/api/routes/point", pointRoutes(pool));
app.use("/api/routes/newMap", newMapRoutes(pool));
//app.use("/api/routes/description", descriptionRoutes(pool));

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index", { title: "Home Page", layout: "./layouts/full-width" });
});

app.get("/existingMap", (req, res) => {
  db.query(`SELECT * FROM maps;`)
    .then((data) => {
      const maps = data.rows;
      console.log("maps", maps);
      res.render("existingMap", {
        title: "existingMaps",
        layout: "./layouts/full-width",
        maps,
      });
      // res.render("existingMap", { maps });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
