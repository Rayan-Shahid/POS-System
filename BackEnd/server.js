const express = require("express");
const cors = require("cors");
const mysql = require ("mysql2/promise");


require("dotenv").config();
const app = express();
const PORT = 8086;

app.use(cors());
app.use(express.json());
console.log("Password loaded:", process.env.DB_PASSWORD ? "YES" : "NO");
console.log("Password length:", process.env.DB_PASSWORD);
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'pos_db',
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, 
  idleTimeout: 60000, 
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

app.post("/api/users", async (req,res)=>{
  try{
    const email = req.body.email
    const bio = req.body.bio
    const country = req.body.country
    const SQL = 'INSERT into Users (email,bio, country)  values(?,?,?)'
    await pool.query(SQL, [email, bio, country]);
    res.status(201).json("user created")
  }
catch(err){
  console.log(err);
  res.status(500).json("Internal server error!")
}
})

app.listen(PORT, ()=>{
  console.log(`Server is running on http://localhost:${PORT}`);
})