const express = require("express")
const upload = require("../middleware/multer")
const { registerUser, loginUser, getCompany } = require("../controllers")
const router = express.Router()

router.post(
   "/register",
   upload.fields([
      { name: "profilePic", maxCount: 1 },
      { name: "coverPic", maxCount: 1 }
   ]),
   registerUser
)

router.post(
   "/login",
   loginUser
)

router.get(
   "/company",
   getCompany
)

router.get("/",(req,res)=>{
    res.send("USER API Working")
})

module.exports = router