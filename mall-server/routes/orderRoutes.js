const express = require("express");
const verifyToken = require("../middleware/jwt");
const { createOrder } = require("../controllers");
const router = express.Router();

router.get("/", (req, res) => {
   res.send("ORDER API Working")
})

router.post('/create',verifyToken,createOrder)

module.exports = router;