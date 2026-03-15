const Cart = require("../../models/cart");

const deleteCartItem = async (req, res) => {
  try {
    const userId = req.user.id; // verifyToken middleware il ninn
    const { cartId } = req.params;

    const deletedItem = await Cart.findOneAndDelete({
      _id: cartId,
      userId: userId
    });

    if (!deletedItem) {
      return res.json({
        status: false,
        message: "Cart item not found"
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

module.exports = { deleteCartItem };