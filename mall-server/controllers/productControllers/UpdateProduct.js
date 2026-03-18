const Product = require("../../models/product");

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { productName, categoryName, rate, offerRate,per } = req.body;

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
    const updatedOfferRate = offerRate ? Number(offerRate) : null;

    // validation
    if (updatedOfferRate > updatedRate) {
      return res.json({
        status: false,
        message: "Offer rate cannot be greater than rate"
      });
    }


    // update fields
    existingProduct.productName = productName || existingProduct.productName;
    existingProduct.categoryName = categoryName || existingProduct.categoryName;
    existingProduct.rate = updatedRate;
    existingProduct.offerRate = updatedOfferRate;
    existingProduct.per = per || existingProduct.per;

    // image update (if new image uploaded)
    if (req.file) {
      existingProduct.image = req.file.secure_url;
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