const Product = require("../../models/product");

const getProducts = async (req, res) => {
    try {
        let { page = 1, limit = 8, categoryName, companyId, search } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        const skip = (page - 1) * limit;
        const id = req.params.id

        let filter = {};
        if (id) {
            filter.companyId = id
        }
        // category filter
        if (categoryName) {
            filter.categoryName = categoryName;
        }

        // company filter
        if (companyId) {
            filter.companyId = companyId;
        }

        // search by product name
        if (search) {
            filter.productName = { $regex: search, $options: "i" };
        }

        const totalProducts = await Product.countDocuments(filter);

        const products = await Product.find(filter)
            .populate("companyId", "name email category")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.json({
            status: true,
            message: "Products fetched successfully",
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts,
            limit,
            products,
        });
    } catch (error) {
        res.json({
            status: false,
            message: error.message,
        });
    }
};

module.exports = {
    getProducts,
};