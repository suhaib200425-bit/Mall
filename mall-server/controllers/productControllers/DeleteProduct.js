const Cart = require("../../models/cart");
const Product = require("../../models/product");

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const deletedItem = await Cart.deleteMany
    ({
      productId
    });
    const deleteProduct = await Product.findByIdAndDelete(productId)

    if (!deleteProduct) {
      return res.json({
        status: false,
        message: "Product item not found"
      });
    }

    res.json({
      status: true,
      message: "Cart item deleted successfully",
      deletedItem
    });

  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "Server error"
    });
  }
};

module.exports = deleteProduct ;