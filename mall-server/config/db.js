const mongoose = require("mongoose")

const connectDB = async () => {
   try{
      await mongoose.connect("mongodb+srv://Suhaib:eh9kNFx7AWDazoV9@cluster0.m0vwzhk.mongodb.net/?appName=Cluster0")
      console.log("Database Connected")
   }
   catch(error){
      console.log("DB Error:", error)
   }
}

module.exports = connectDB