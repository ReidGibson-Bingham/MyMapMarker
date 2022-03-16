const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    let pos = JSON.parse(req.body.position);
    console.log("latitude", pos.lat);
    console.log("longitude", pos.lng);
    db.query(
      `INSERT INTO points(title, latitude, longitude)
      VALUES(${pos.lat}, ${pos.lat}, ${pos.lng})`
    );
  });

  return router;
};
