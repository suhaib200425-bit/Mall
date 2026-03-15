const Cart = require("../../models/cart");

const addToCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    if (!productId) {
      return res.json({
        status: false,
        message: "Product ID is required"
      });
    }

    const existingCartItem = await Cart.findOne({ productId, userId })
      .populate("productId") // Product details varum;

    if (existingCartItem) {
      existingCartItem.qty += Number(1);
      await existingCartItem.save();

      return res.json({
        status: true,
        message: "Cart updated successfully",
        cart: existingCartItem
      });
    }

    const newCartItem = new Cart({
      productId,
      qty: Number(1),
      userId
    });

    await newCartItem.save();
    const getnewcart = await Cart.findById(newCartItem._id)
      .populate("productId") // Product details varum;
    res.json({
      status: true,
      message: "Product added to cart successfully",
      cart: getnewcart
    });

  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "Server error",
      error: error.message
    });
  }
};

module.exports = addToCart;