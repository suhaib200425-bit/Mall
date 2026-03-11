const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
const User =require('./models/user')
require("dotenv").config();
const app = express()

// app.use(cors())
app.use(express.json())
app.use(cors({
  origin: "*",
}));
//IMAGE
app.use('/uploads', express.static('uploads'));

//DATABASE CONNECTED
connectDB()

//API END POINTS
app.use('/api/user',require('./routes/userRouters'))

app.get("/",async (req,res)=>{
    const data= await User.find()
    res.json({
        message:"API Working",
        data
    })
})

app.listen(5000,()=>{
    console.log("Server running")
})