const express = require("express");
const verifyToken = require("../middleware/jwt");
const { bannerChanges } = require("../controllers/bannerControllers/CU-Banner");
const upload = require("../middleware/multer");
const { getBanner } = require("../controllers");
const router = express.Router();

router.get("/", (req, res) => {
   res.send("BANNER API Working")
})

router.get("/get/:id", getBanner)

// CREATE / UPDATE banner
router.post("/save", 
    verifyToken,
    upload.single("banner"),
    bannerChanges
);



module.exports = router;