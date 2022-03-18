
///points route
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    let pos = JSON.parse(req.body.position);
    let title = req.body.title;
    console.log("post", title);
    let description = req.body.description;
    db.query(
      `INSERT INTO points(title, latitude, longitude, description)
      VALUES($1, $2, $3, $4)`,
      [title, pos.lat, pos.lng, description]
    ).then(() => {
      res.send({ status: "sucessful post" });
    });
  });

  router.get("/", (req, res) => {
    let title = req.query.title;
    console.log("retrieve title from get", req.query.title);
    //let description = req.body.description;
    db.query(
      `SELECT description FROM points
      WHERE title = $1`,
      [title]
    ).then((result) => {
      console.log(result.rows[0].description);
      res.send(result.rows[0].description);
      //return result.rows.description;
    });
  });

  return router;
};



