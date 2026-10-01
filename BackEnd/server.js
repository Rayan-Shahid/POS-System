const express = require("express");
const cors = require("cors");
const mysql = require ("mysql2/promise");
 

const app = express();
const PORT = 8086;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'pos_db',
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});
app.get ("/", (req, res)=>{
  res.json("API running")
})
app.get("/api/users", async (req, res)=> {

  try{
    const [results, fields] = await pool.query(
      'SELECT * from Users'
    );
    console.log(results);
    console.log(fields);
    res.json(results);
  } catch (err) {
    console.log(err);
  }
})


app.listen(PORT, ()=>{
  console.log(`Server is running on http://localhost:${PORT}`);
})