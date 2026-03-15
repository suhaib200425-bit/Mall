const Cart = require("../../models/cart");

const decreaseCartQty = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    if (!productId) {
      return res.json({
        status: false,
        message: "Product ID is required"
      });
    }

    const cartItem = await Cart.findOne({ productId, userId })
      .populate("productId") // Product details varum;

    if (!cartItem) {
      return res.json({
        status: false,
        message: "Product not found in cart"
      });
    }

    // qty 1 aanenkil remove from cart
    if (cartItem.qty <= 1) {
      await Cart.findByIdAndDelete(cartItem._id);

      return res.json({
        status: true,
        message: "Product removed from cart because qty reached 0"
      });
    }

    // qty reduce
    cartItem.qty -= 1;
    await cartItem.save();

    res.json({
      status: true,
      message: "Cart quantity decreased successfully",
      cart: cartItem
    });

  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "Server error",
      error:error.message
    });
  }
};

module.exports = { decreaseCartQty };