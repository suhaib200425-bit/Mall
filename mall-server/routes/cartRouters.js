const express = require("express");
const verifyToken = require("../middleware/jwt");
const { addToCart, decreaseCartQty, allCart, deleteCartItem } = require("../controllers");
const router = express.Router();

router.get("/", (req, res) => {
   res.send("CART API Working")
})

router.get("/add/:productId",verifyToken,addToCart )

router.get("/remove/:productId", verifyToken,decreaseCartQty);

router.get("/get", verifyToken,allCart);

router.delete("/delete/:cartId", verifyToken,deleteCartItem);



module.exports = router;