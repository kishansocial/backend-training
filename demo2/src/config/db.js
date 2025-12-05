const { Pool } = require("pg");
// require("dotenv").config();

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "admin",
  password: "secret123",
  database: "mydb",
});

pool
  .connect()
  .then(() => console.log("🔥 PostgreSQL Connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

module.exports = pool;
