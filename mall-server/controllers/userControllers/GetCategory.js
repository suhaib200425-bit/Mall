const User = require("../../models/user");

const getCategorys = async (req, res) => {
    try {

        const categorys = await User.distinct("category", { role: "owner" });

        console.log(categorys);

        res.json({
            status: true,
            categorys
        });

    } catch (error) {
        res.json({
            status: false,
            message: error.message
        });
    }
};

module.exports = getCategorys;