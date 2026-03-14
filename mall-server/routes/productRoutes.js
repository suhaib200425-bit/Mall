const express = require("express");
const verifyToken = require("../middleware/jwt");
const upload = require("../middleware/multer");
const { addProduct, getProducts } = require("../controllers");
const router = express.Router();

router.get("/", (req, res) => {
   res.send("PRODUCT API Working")
})

router.post("/save",verifyToken,upload.single('image'),addProduct )

router.get("/gets/:id", getProducts);



module.exports = router;