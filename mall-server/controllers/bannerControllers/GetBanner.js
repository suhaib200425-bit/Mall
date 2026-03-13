const Banner = require("../../models/banner");

const getBanner = async (req, res) => {
    try {
        const userId = req.params.id

        if (!userId) {
            return res.json({
                status: false,
                message: "User ID required"
            });
        }

        const existingBanner = await Banner.findOne({ userId });

        res.json({
            status: true,
            data: existingBanner
        });


    } catch (error) {
        res.json({
            status: false,
            message: error.message
        });
    }
};

module.exports = { getBanner };