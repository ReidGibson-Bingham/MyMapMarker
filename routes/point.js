const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    let pos = JSON.parse(req.body.position);
    //console.log("this is req/body", pos);
    let title = req.body.title;
    //let markerId = req.body.markerId;
    //let label = req.body.label;
    let description = req.body.description;
    //console.log("req.body is", req.body.position);
    //console.log("title", title);
    db.query(
      `INSERT INTO points(title, latitude, longitude, description)
      VALUES($1, $2, $3, $4)`,
      [title, pos.lat, pos.lng, description]
    );
    // db.query(
    //   `INSERT INTO points(title, description, latitude, longitude)
    //   VALUES('${title}', ${pos.lat}, ${pos.lng})`
    // );
  });

  return router;
};
