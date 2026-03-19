// controllers/order/orderController.js
const crypto = require("crypto");
const Cart = require("../../models/cart");
const Order = require("../../models/order");

const verifyRazorpayPayment = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      table,
    } = req.body;

    // 1. create expected signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // 2. verify signature
    if (generatedSignature !== razorpay_signature) {
      return res.json({
        status: false,
        message: "Payment verification failed",
      });
    }

    // 3. fetch cart items
    const cartItems = await Cart.find({ userId }).populate("productId");

    if (!cartItems || cartItems.length === 0) {
      return res.json({
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

    // 4. create DB order after payment success
    const newOrder = new Order({
      userId,
      items,
      subtotal,
      table,
      paymentMethod: "ONLINE",
      paymentStatus: "PAID",
      orderStatus: "PLACED",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
    });

    await newOrder.save();

    // 5. clear cart
    await Cart.deleteMany({ userId });

    res.status(200).json({
      status: true,
      message: "Payment verified and order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.log("Verification error:", error);
    res.status(500).json({
      status: false,
      message: "Payment verification failed",
    });
  }
};

module.exports = verifyRazorpayPayment;