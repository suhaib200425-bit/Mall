const Product = require("../../models/product");
const mongoose = require("mongoose");
const getProduct = async (req, res) => {
    try {
        const id = req.params.productId

        console.log("Product ID:", id);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: false,
                message: "Invalid Product ID",
            });
        }


        const product = await Product.findById(id)
            .populate("companyId", "name email category")

        if (!product) {
            return res.json({
                status: false,
                message: "Product Is Not Found",
            });
        }
        res.json({
            status: true,
            message: "Products fetched successfully",
            product,
        });
    } catch (error) {
        res.json({
            status: false,
            message: error.message,
        });
    }
};

module.exports = getProduct