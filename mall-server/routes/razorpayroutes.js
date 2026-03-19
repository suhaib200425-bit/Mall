const express = require("express");
const verifyToken = require("../middleware/jwt");
const { verifyRazorpayPayment, createRazorpayOrder } = require("../controllers");
const router = express.Router();

router.get("/", (req, res) => {
   res.send("ORDER API Working")
})

router.post('/order',verifyToken,createRazorpayOrder)
router.post('/verify',verifyToken,verifyRazorpayPayment)
router.get('/verify',verifyToken,(req,res)=>{
   res.send('okey')
})

module.exports = router;