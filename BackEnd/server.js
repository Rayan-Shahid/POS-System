const express = require("express");
const cors = require("cors");
 
const app = express();
const PORT = 8086;

app.use(cors());
app.use(express.json());

app.get("/", (req, res)=> {
  res.json({
    message: "POS 1st API runnin"
  })  
})

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})