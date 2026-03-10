const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {

  const token = req.headers.authorization

  if (!token) {
    return res.json({
      status: false,
      message: "Token required"
    })
  }

  try {

    const decoded = jwt.verify(token, "SECRET_KEY")

    req.user = decoded

    next()

  } catch (error) {

    res.json({
      status: false,
      message: "Invalid token"
    })
  }
}

module.exports = verifyToken