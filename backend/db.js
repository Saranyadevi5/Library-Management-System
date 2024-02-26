const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "#Sara271022@",
  host: "localhost",
  port: 5432,
  database: "library"
});

module.exports = pool;