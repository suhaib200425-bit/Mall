const User = require("../../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const loginUser = async (req, res) => {

  try {

 console.log(req.body);
    const { email, password } = req.body
 
    const user = await User.findOne({ email })

    if (!user) {
      return res.json({
        status: false,
        message: "User not found"
      })
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
      return res.json({
        status: false,
        message: "Invalid password"
      })
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "SECRET_KEY",
      { expiresIn: "1d" }
    )

    res.json({
      status: true,
      message: "Login success",
      token
    })

  } catch (error) {
    res.json({
      status: false,
      message: error.message
    })
  }
}

module.exports = loginUser