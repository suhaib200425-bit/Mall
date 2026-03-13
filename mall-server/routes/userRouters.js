const express = require("express")
const upload = require("../middleware/multer")
const { registerUser, loginUser, getCompany, getCategorys, getCategoryCompanys, loggedUser, updateCoverPic } = require("../controllers")
const verifyToken = require("../middleware/jwt")
const router = express.Router()


router.get("/", (req, res) => {
   res.send("USER API Working")
})

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

router.get(
   "/categorys",
   getCategorys
)

router.get(
   "/company/:category",
   getCategoryCompanys
)


router.get(
   "/logged",
   verifyToken,
   loggedUser
)

router.put("/update-cover", verifyToken, upload.single("coverPic"), updateCoverPic);

module.exports = router