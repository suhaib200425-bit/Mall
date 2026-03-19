const Order = require("../../models/order");
const Cart = require("../../models/cart");

const 
createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { tablenumber } = req.body;

    // userinte cart items edukkuka
    const cartItems = await Cart.find({ userId }).populate("productId");

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        status: false,
        message: "Cart is empty",
      });
    }

    let items = [];
    let subtotal = 0;

    cartItems.forEach((cart) => {
      const itemTotal = cart.quantity * cart.productId.price;

      items.push({
        productId: cart.productId._id,
        productName: cart.productId.productName,
        price: cart.productId.price,
        quantity: cart.quantity,
        total: itemTotal,
      });

      subtotal += itemTotal;
    });

    const newOrder = new Order({
      userId,
      items,
      subtotal,
      tablenumber,
      paymentMethod: "ONLINE",
      paymentStatus: paymentMethod === "ONLINE" ? "PENDING" : "PENDING",
      orderStatus: "PLACED",
    });

    await newOrder.save();

    // order create ayal cart clear cheyyam
    await Cart.deleteMany({ userId });

    res.status(201).json({
      status: true,
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Order creation failed",
    });
  }
};

module.exports = { createOrder };