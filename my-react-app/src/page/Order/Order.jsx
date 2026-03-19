import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Order.css";
import { API_END_POINT } from "../../assets/main";

const Order = () => {
  const [orders, setOrders] = useState([
    {
      _id: "65f123456789",
      totalAmount: 1200,
      paymentStatus: true,
      createdAt: "2026-03-19T10:20:00.000Z",
      items: [
        {
          productName: "T-Shirt",
          quantity: 2
        }
      ]
    },{
      _id: "65f123456789",
      totalAmount: 1200,
      paymentStatus: true,
      createdAt: "2026-03-19T10:20:00.000Z",
      items: [
        {
          productName: "T-Shirt",
          quantity: 2
        }
      ]
    },
  ]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${API_END_POINT}/api/order/gets`, {
        headers: {
          Authorization: token,
        },
      });
console.log(response.data);

      if (response.data.status) {
        
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.log("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-page">
      <h2 className="orders-title">My Orders</h2>

      {loading ? (
        <p className="orders-loading">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="orders-empty">No orders found</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-top">
                <h3>Order #{order._id.slice(-6).toUpperCase()}</h3>
                <span className={`order-status ${order.paymentStatus ? "paid" : "pending"}`}>
                  {order.paymentStatus ? "Paid" : "Pending"}
                </span>
              </div>

              <p><strong>Total:</strong> ₹{order.subtotal}</p>
              <p><strong>Items:</strong> {order.items?.length || 0}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>

              {/* <div className="order-items">
                <h4>Products:</h4>
                {order.items?.map((item, index) => (
                  <div className="order-item" key={index}>
                    <span>{item.productName || "Product"}</span>
                    <span>Qty: {item.quantity}</span>
                  </div>
                ))}
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;