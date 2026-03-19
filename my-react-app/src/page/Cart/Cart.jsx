import React, { useEffect, useState } from 'react'
import './Cart.css'
import { Offer } from '../../assets/assets';
import { useMall } from '../../Context/MallContext';
import axios from 'axios';
import { API_END_POINT } from '../../assets/main';
import handlePayment from './RAZORPAY';
function Cart() {
    const token = localStorage.getItem('token')
    const [products, setproducts] = useState();
    const { setCart, cart } = useMall()
    const [subtotal, setSubtotal] = useState(0)

    useEffect(() => {
        const cartList = Object.values(cart);
        console.log(cartList);
        console.log(0)
        const sum = cartList.reduce((total, item) => total + ((item.productId.offerRate ? item.productId.offerRate : item.productId.rate) * item.qty), 0);
        setproducts(cartList)

        setSubtotal(sum)
    }, [cart])

    const increase = async (id, value) => {
        const response = await axios.get(`${API_END_POINT}/api/cart/add/${id}`, {
            headers: {
                Authorization: token
            }
        });
        console.log(response.data);
        if (response.data.status) {
            setCart((prev) => {
                return { ...prev, [id]: response.data.cart }; // first add
            });
            setproducts(prev => [...prev, response.data.cart])
            const cartitem = response.data.cart
            const filterproduct = products.map((elem) => {
                if (elem._id == cartitem._id) {
                    return cartitem
                } else {
                    return elem
                }
            })
            setproducts(filterproduct)
        }
    };

    const decrease = async (id, value) => {
        const response = await axios.get(`${API_END_POINT}/api/cart/remove/${id}`, {
            headers: {
                Authorization: token
            }
        });
        if (response.data.status && response.data.cart) {
            setCart((prev) => {
                return { ...prev, [id]: response.data.cart };
            });
            const filterproduct = products.map((elem) => {
                if (elem._id == response.data.cart._id) {
                    return response.data.cart
                } else {

                    return elem
                }
            })
            setproducts(filterproduct)
        }
        if (!response.data.cart) {
            setCart((prev) => {
                const newCart = { ...prev };
                delete newCart[id]; // remove item
                return newCart;
            });
            const newArray = products.filter((item) => item.productId._id !== id);
            setproducts(newArray)
        }
    };

    const deleteCart = async (cartId, productId) => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.delete(
                `${API_END_POINT}/api/cart/delete/${cartId}`,
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            console.log(res.data);

            if (res.data.status) {
                // state il ninn remove cheyyam
                setCart((prev) => {
                    const newCart = { ...prev };
                    delete newCart[productId]; // remove item
                    return newCart;
                });
                setproducts((prev) => prev.filter((item) => item._id !== cartId));
            }

        } catch (error) {
            console.log(error);
        }
    };

    // const subtotal = products.reduce((acc, item) => acc + item.rate, 0);
    function discountPercentage(original, offer) {
        return Math.round(((original - offer) / original) * 100) + '%';
    }

    function rowWaystotal(id, rate, qty) {
        return qty * rate
    }
    return (
        <div className='Cart' >
            <h2 className="mb-3 mt-3" onClick={() => {
                console.log(cart);
            }}>Cart</h2>

            <div className="row">

                {/* LEFT SIDE */}
                <div className="col-lg-8">

                    <div className="cart-box">

                        {(products && products.length != 0) ? products.map(item => {

                            return <div key={item._id} className="cart-item d-flex align-items-center justify-content-between">

                                <div className="Cart-box-item d-flex align-items-center gap-3">

                                    <img src={item?.productId?.image} className="cart-img" />

                                    <div>
                                        <h6 className="mb-1">{item?.productId?.productName}</h6>
                                        <small>{item?.productId?.per} / {item?.productId?.offerRate ? discountPercentage(item?.productId?.rate, item?.productId?.offerRate) : ''}</small>
                                    </div>

                                </div>

                                <div className="qty-box">

                                    <button onClick={() => decrease(item.productId._id, item?.productId?.offerRate ? item?.productId?.offerRate : item?.productId?.rate)}>-</button>
                                    <span>{item.qty}</span>
                                    <button onClick={() => increase(item.productId._id, item?.productId?.offerRate ? item?.productId?.offerRate : item?.productId?.rate)}>+</button>

                                </div>

                                <div>
                                    {item.productId.offerRate != null ?
                                        <p>₹{rowWaystotal(item.productId._id, item?.productId?.offerRate, item.qty)}/<span style={{ textDecoration: 'line-through' }}>₹{rowWaystotal(item._id, item.productId.rate)}</span></p>
                                        : <p>₹{rowWaystotal(item.productId._id, item.productId.rate, item.qty)}/-</p>}

                                </div>

                                <div>
                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteCart(item._id, item.productId._id)}
                                    >
                                        🗑
                                    </button>
                                </div>

                            </div>
                        })
                            : <h5>Empty</h5>}

                    </div>

                    {/* <button className="update-btn mt-3">Update Cart</button> */}

                </div>


                {/* RIGHT SIDE */}

                <div className="col-lg-4">

                    <div className="summary-box">

                        <h5>Order Summary</h5>

                        <div className="d-flex mt-3 gap-2">

                            <input
                                className="form-control"
                                placeholder="Discount voucher"
                            />

                            <button className="btn btn-outline-dark">
                                Apply
                            </button>

                        </div>

                        <div className="summary mt-4">

                            <div className="d-flex justify-content-between">
                                <span>Sub Total</span>
                                <span>₹{subtotal}</span>
                            </div>

                            {/* <div className="d-flex justify-content-between">
                                <span>Discount (10%)</span>
                                <span>-100</span>
                            </div> */}

                            <div className="d-flex justify-content-between">
                                <span>Plateform fee</span>
                                <span>₹10</span>
                            </div>

                            <hr />

                            <div className="d-flex justify-content-between fw-bold">
                                <span>Total</span>
                                <span>{subtotal + 10}</span>
                            </div>

                        </div>

                        <button className="checkout-btn mt-4" onClick={handlePayment}>
                            Checkout Now
                        </button>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Cart