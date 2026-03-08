import React, { useEffect, useState } from 'react'
import './Cart.css'
import { Offer } from '../../assets/assets';
import { useMall } from '../../Context/MallContext';
function Cart() {

    const [products, setproducts] = useState();
    const { cart, setCart } = useMall()

    useEffect(() => {
        const keys = Object.keys(cart)

        const result = Offer.filter(product =>
            keys.includes(product.id.toString())
        )

        console.log(result)
        setproducts(result)
    }, [])

    const increase = (id) => {
        setCart((prev) => {
            const count = prev[id] || 0;

            if (count === 0) {
                return { ...prev, [id]: 1 }; // first add
            } else {
                return { ...prev, [id]: count + 1 }; // increase
            }
        });
    };

    const decrease = (id) => {
        setCart((prev) => {
            const count = prev[id];

            if (count === 1) {
                const newCart = { ...prev };
                delete newCart[id]; // remove item
                return newCart;
            }

            return { ...prev, [id]: count - 1 };
        });
    };

    const removeItem = (id) => {
        setproducts(products.filter(item => item.id !== id));
    };

    // const subtotal = products.reduce((acc, item) => acc + item.rate, 0);
    function discountPercentage(original, offer) {
        return Math.round(((original - offer) / original) * 100) + '%';
    }
    
    function rowWaystotal(id,rate){
        return cart[id]*rate
    }
    return (
        <div className='Cart' >
            <h2 className="mb-3 mt-3" onClick={() => {
                console.log(cart);
            }}>Shopping Cart</h2>

            <div className="row">

                {/* LEFT SIDE */}
                <div className="col-lg-8">

                    <div className="cart-box">

                        {(products&&products.length!=0 )? products.map(item => {

                            return <div key={item.id} className="cart-item d-flex align-items-center justify-content-between">

                                <div className="Cart-box-item d-flex align-items-center gap-3">

                                    <img src={item.image} className="cart-img" />

                                    <div>
                                        <h6 className="mb-1">{item.title}</h6>
                                        <small>{item.per} & {item.offerRate ? discountPercentage(item.rate, item.offerRate) : ''}</small>
                                    </div>

                                </div>

                                <div className="qty-box">

                                    <button onClick={() => decrease(item.id)}>-</button>
                                    <span>{cart[item.id]}</span>
                                    <button onClick={() => increase(item.id)}>+</button>

                                </div>

                                <div>
                                    {item.offerRate != null ?
                                        <p>₹{rowWaystotal(item.id,item.offerRate)}/<span style={{ textDecoration: 'line-through' }}>₹{rowWaystotal(item.id,item.rate)}</span></p>
                                        : <p>₹{rowWaystotal(item.id,item.rate)}/-</p>}

                                </div>

                                <div>
                                    <button
                                        className="delete-btn"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        🗑
                                    </button>
                                </div>

                            </div>
                        })
                    :<h5>Empty</h5>}

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
                                <span>$2000</span>
                            </div>

                            <div className="d-flex justify-content-between">
                                <span>Discount (10%)</span>
                                <span>-100</span>
                            </div>

                            <div className="d-flex justify-content-between">
                                <span>Delivery fee</span>
                                <span>$50</span>
                            </div>

                            <hr />

                            <div className="d-flex justify-content-between fw-bold">
                                <span>Total</span>
                                <span>$1850</span>
                            </div>

                        </div>

                        <button className="checkout-btn mt-4">
                            Checkout Now
                        </button>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Cart