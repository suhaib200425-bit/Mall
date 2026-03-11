const User = require("../../models/user");

const getCategoryCompanys = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const category = req.params.category || '';
        const limit = 10;

        const skip = (page - 1) * limit;

        const companys = await User.find({ role: { $ne: "user" }, category })
            .skip(skip)
            .limit(limit);

        const total = await User.countDocuments({ role: { $ne: "user" },category });

        res.json({
            status: true,
            companys,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });

    } catch (error) {
        res.json({
            status: false,
            message: error.message
        });
    }
};

module.exports = getCategoryCompanys