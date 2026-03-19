// controllers/order/orderController.js
// const Cart = require("../../models/cart");
const razorpayInstance = require("../../config/razorpay");

const createRazorpayOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            res.json({
                status: false,
                message: "login you account",
            });
        }
        const { amount } = req.body

        // Razorpay expects paise
        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const razorpayOrder = await razorpayInstance.orders.create(options);

        res.status(200).json({
            status: true,
            message: "Razorpay order created successfully",
            razorpayOrder,
            amount,
            key: process.env.RAZORPAY_KEY_ID,
        });
    } catch (error) {
        console.log("Razorpay order error:", error);
        res.json({
            status: false,
            message: "Failed to create Razorpay order",
        });
    }
};

module.exports = createRazorpayOrder;