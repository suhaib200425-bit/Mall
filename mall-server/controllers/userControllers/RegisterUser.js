const User = require("../../models/user")
const bcrypt = require("bcrypt")

const registerUser = async (req, res) => {

    try {

        const { name, email, password, confirmPassword, role, category } = req.body
console.log(req.body);

        if (!name || !email || !password || !confirmPassword || !role) {
            return res.json({ status: false, message: "All filed Is requird" })
        }

        if (password !== confirmPassword) {
            return res.json({ status: false, message: "Passwords do not match" })
        }

        // category check
        if (role !== "user" && !category) {
            return res.json({
                status: false,
                message: "Category is required for shop owners"
            });
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.json({ status: false, message: "Email already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const profilePic = req.files.profilePic
            ? `/uploads/${req.files.profilePic[0].filename}`
            : ""

        const coverPic = req.files.coverPic
            ? `/uploads/${req.files.coverPic[0].filename}`
            : ""

        const user = new User({
            name,
            email,
            password: hashedPassword,
            profilePic,
            coverPic,
            role: role || 'user'
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