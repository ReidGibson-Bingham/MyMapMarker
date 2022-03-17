const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    console.log(req.body);

    let title = req.body.title;
    console.log("title", req.body.title);
    let description = req.body.description;
    console.log("description", req.body.description);
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;

    db.query(
      `INSERT INTO maps(title, description, latitude, longitude) VALUES($1, $2, $3, $4)`,
      [title, description, latitude, longitude]
    );

    /*
/*db.query(
      `INSERT INTO maps(title, latitude, longitude, description)
      VALUES($1, $2, $3, $4)`,
      [title, pos.lat, pos.lng, description]
    );
*/
  });

  return router;
};
