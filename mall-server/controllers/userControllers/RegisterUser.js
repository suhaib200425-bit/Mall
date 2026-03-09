const User = require("../../models/user")
const bcrypt = require("bcrypt")

const registerUser = async (req, res) => {

    try {

        const { name, email, password, confirmPassword, role } = req.body

        if (password !== confirmPassword) {
            return res.json({ status: false, message: "Passwords do not match" })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.json({ status: false, message: "Email already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const profilePic = req.files.profilePic
            ? req.files.profilePic[0].filename
            : ""

        const coverPic = req.files.coverPic
            ? req.files.coverPic[0].filename
            : ""

        const user = new User({
            name,
            email,
            password: hashedPassword,
            profilePic,
            coverPic,
            role:role || 'user'
        })

        await user.save()

        res.json({
            status: true,
            message: 'Registration Commpleted'
        })

    } catch (error) {
        res.json(
            {
                status: false,
                message: error.message,
                error
            }
        )
    }

}

module.exports = registerUser