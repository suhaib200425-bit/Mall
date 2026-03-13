const express = require("express");
const verifyToken = require("../middleware/jwt");
const { bannerChanges } = require("../controllers/bannerControllers/CU-Banner");
const upload = require("../middleware/multer");
const router = express.Router();



// CREATE / UPDATE banner
router.post("/save", 
    verifyToken,
    upload.single("banner"),
    bannerChanges
);

router.get("/", (req, res) => {
   res.send("BANNER API Working")
})

module.exports = router;