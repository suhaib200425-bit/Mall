const Cart = require("../../models/cart");

const allCart = async (req, res) => {
  try {
    const userId = req.user.id;

    // query params
    // const page = Number(req.query.page) || 1;
    // const limit = Number(req.query.limit) || 10;
    // const skip = (page - 1) * limit;

    // total count
    const totalItems = await Cart.countDocuments({ userId });

    // cart items with populate
    const carts = await Cart.find({ userId })
      .populate("productId") // Product details varum
    //   .skip(skip)
    //   .limit(limit)
      .sort({ createdAt: -1 });
console.log(carts);

    res.json({
      status: true,
      message: "Cart read successfully",
      carts,
      pagination: {
        totalItems,
        // currentPage: page,
        // totalPages: Math.ceil(totalItems / limit),
        // limit
      }
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

module.exports = allCart;