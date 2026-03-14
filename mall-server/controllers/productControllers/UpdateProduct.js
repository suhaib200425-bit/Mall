const Product = require("../../models/product");

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { productName, categoryName, companyId, rate, offerRate } = req.body;

    // product find cheyyuka
    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.json({
        status: false,
        message: "Product not found"
      });
    }

    // new values or old values
    const updatedRate = rate ? Number(rate) : existingProduct.rate;
    const updatedOfferRate = offerRate ? Number(offerRate) : existingProduct.offerRate;

    // validation
    if (updatedOfferRate > updatedRate) {
      return res.json({
        status: false,
        message: "Offer rate cannot be greater than rate"
      });
    }

    // auto calculate percentage
    const per = Math.round(((updatedRate - updatedOfferRate) / updatedRate) * 100);

    // update fields
    existingProduct.productName = productName || existingProduct.productName;
    existingProduct.categoryName = categoryName || existingProduct.categoryName;
    existingProduct.companyId = companyId || existingProduct.companyId;
    existingProduct.rate = updatedRate;
    existingProduct.offerRate = updatedOfferRate;
    existingProduct.per = per;

    // image update (if new image uploaded)
    if (req.file) {
      existingProduct.image = req.file.path;
    }

    await existingProduct.save();

    res.json({
      status: true,
      message: "Product updated successfully",
      product: existingProduct
    });

  } catch (error) {
    console.log("Update Product Error:", error);
    res.json({
      status: false,
      message: "Server error"
    });
  }
};

module.exports = updateProduct;