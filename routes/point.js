const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    let pos = JSON.parse(req.body.position);
    let title = `${pos.lat}${pos.lng}`;
    console.log("title:", title);
    console.log("latitude", pos.lat);
    console.log("longitude", pos.lng);
    //console.log("title");
    db.query(
      `INSERT INTO points(title, latitude, longitude)
      VALUES($1, $2, $3)`,
      [title, pos.lat, pos.lng]
    );
  });

  return router;
};


