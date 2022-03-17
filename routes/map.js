const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(
      `SELECT latitude, longitude FROM points;`)
      .then(({rows: coordinates}) => { // {rows.coordinates} is the same data.rows
        console.log("data.row:", coordinates);
        res.send(coordinates);
      })
      .catch(err => {
        console.log("error:", err);
        // return err;
        res.send(err);
      })
  })
  return router;
}
