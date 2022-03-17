const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    let pos = JSON.parse(req.body.position);
    let title = `My dog, ${dogName}, is a great pet!`;
    console.log("looking for title:",req.body.title);
    console.log("latitude", pos.lat);
    console.log("longitude", pos.lng);
    //console.log("title");
    db.query(
      `INSERT INTO points(title, latitude, longitude)
      VALUES(${title}, ${pos.lat}, ${pos.lng})`
    );
  });

  return router;
};
