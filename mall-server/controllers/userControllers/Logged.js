const User = require("../../models/user");

const loggedUser = async (req, res) => {
    try {
        // user database check
        const user = await User.findById(req.user.id)

        if (!user) {
            return res.status(401).json({
                status: false,
                message: "User not found"
            })
        }


        res.json({
            status: true,
            message:"User Already Logged",
            user
        });

    } catch (error) {
        res.json({
            status: false,
            message: error.message
        });
    }
};

module.exports = loggedUser;