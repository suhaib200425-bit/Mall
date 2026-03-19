import React from "react";
import axios from "axios";
import { API_END_POINT } from "../../assets/main";


const token = localStorage.getItem("token");

const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};


const handlePayment = async (amount) => {
    try {
        const loaded = await loadRazorpayScript();

        if (!loaded) {
            alert("Razorpay SDK failed to load");
            return;
        }


        const { data } = await axios.post(
            `${API_END_POINT}/api/rayzorpay/order`,
            { amount },
            {
                headers: {
                    Authorization: token,
                },
            }
        );

        const options = {
            key: data.key,
            amount: data.razorpayOrder.amount,
            currency: data.razorpayOrder.currency,
            name: "Garuda Mall",
            description: "Order Payment",
            order_id: data.razorpayOrder.id,

            handler: async function (response) {
                const verifyRes = await axios.post(
                    `${API_END_POINT}/api/rayzorpay/verify`,
                    {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        table: 5,
                    },
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );

                if (verifyRes.data.status) {
                    alert("Order placed successfully");
                } else {
                    alert("Payment verification failed");
                }
            },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    } catch (error) {
        console.log(error);
        alert("Payment process failed");
        return false
    }
};

export default handlePayment;