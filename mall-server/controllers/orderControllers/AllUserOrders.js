const Order = require("../../models/order");

const allOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 });

    res.json({
      status: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.log("Error fetching orders:", error);
    res.status(500).json({
      status: false,
      message: "Failed to fetch orders",
    });
  }
};

module.exports = allOrders;