const express = require("express");
const verifyToken = require("../middleware/jwt");
const upload = require("../middleware/multer");
const { addProduct, getProducts, deleteProduct, getProduct, updateProduct } = require("../controllers");
const router = express.Router();

router.get("/", (req, res) => {
   res.send("PRODUCT API Working")
})

router.post("/save", verifyToken, upload.single('image'), addProduct)

router.get("/gets/:id", getProducts);

router.delete("/delete/:productId", deleteProduct);

router.get("/get/:productId", verifyToken, getProduct);

router.patch("/update/:productId", verifyToken,upload.single('image'), updateProduct);

module.exports = router;