const express = require("express");
const verifyToken = require("../middleware/jwt");
const { allOrders } = require("../controllers");
const router = express.Router();

router.get("/", (req, res) => {
   res.send("ORDER API Working")
})

router.get('/gets',verifyToken,allOrders)

module.exports = router;