const db = require("./config/mysql");

db.query("SELECT 1", (err, result) => {
  if (err) console.log(err);
  else console.log("MySQL test query successful");
});
