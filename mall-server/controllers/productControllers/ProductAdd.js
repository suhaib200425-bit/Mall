const Product = require("../../models/product");

const addProduct = async (req, res) => {
    try {
        const { productName, categoryName, per, rate, offerRate } = req.body;

        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        const companyId = req.user.id
        // validation
        if (!productName || !categoryName || !per || !companyId || !rate) {
            return res.json({
                status: false,
                message: "All fields are required"
            });
        }

        // image check
        if (!req.file) {
            return res.json({
                status: false,
                message: "Product image is required"
            });
        }

        const newProduct = new Product({
            productName,
            categoryName,
            per,
            companyId,
            offerRate: offerRate ? offerRate : null,
            rate,
            image: req.file.secure_url // cloudinary url
        });

        await newProduct.save();

        res.json({
            status: true,
            message: "Product added successfully",
            product: newProduct
        });

    } catch (error) {
        console.log("Add Product Error:", error);
        res.json({
            status: false,
            message: error.message
        });
    }
};

module.exports = addProduct;