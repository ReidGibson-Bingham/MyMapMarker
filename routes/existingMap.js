// const express = require('express');
// const router  = express.Router();


// module.exports = (db) => {
//   router.get("/", (req, res) => {
//     console.log("*************");
//     db.query(`SELECT * FROM maps;`)
//       .then(data => {
//         const maps = data.rows;
//         console.log("maps", maps);
//         res.render("existingMap", { maps });
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });
//   return router;
// };
