const mysql2 = require("mysql2/promise");

const pool = mysql2.createPool({
  port: process.env.MYSQL_PORT,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const connectToDatabase = async () => {
  try {
    await pool.getConnection();
    console.log("MySQL Connection Successfull");
  } catch (error) {
    console.log("Error connecting database");
    console.log(error);
  }
};

module.exports = { connectToDatabase, pool };
