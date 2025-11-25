const { Pool } = require("pg");
require("dotenv").config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
pool
  .connect()
  .then((client) => {
    console.log("Database Connected Successfully");
    client.release();
  })
  .catch((err) => {
    console.error("There is an error while connecting the database", err);
  });
module.exports = pool;
