const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")

const app = express()

app.use(cors())
app.use(express.json())
//DATABASE CONNECTED
connectDB()

//API END POINTS
app.use('/api/user',require('./routes/userRouters'))

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(5000,()=>{
    console.log("Server running")
})