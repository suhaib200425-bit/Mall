import React, { useEffect, useRef, useState } from 'react'
import './GroceryCard.css'
import { useMall } from '../../Context/MallContext';
function GroceryCard({ Grocery, index }) {

    const boxRef = useRef(null);
    useEffect(() => {

        const observer = new IntersectionObserver(
            ([entry]) => {
                console.log(entry);

                if (entry.isIntersecting) {
                    boxRef.current.classList.add("GroceryCardanimateEnter");
                }

                // element screeninte topin mukal poyaal remove
                if (entry.boundingClientRect.top > window.innerHeight) {
                    boxRef.current.classList.remove("GroceryCardanimateEnter");
                }
            },
            { threshold: 0 }
        );

        observer.observe(boxRef.current);

        return () => observer.disconnect();

    }, []);
    const { cart, setCart,user } = useMall()
    function discountPercentage(original, offer) {
        return Math.round(((original - offer) / original) * 100);
    }

    function handleCart(id) {
        setCart((prev) => {
            const count = prev[id] || 0;

            if (count === 0) {
                return { ...prev, [id]: 1 }; // first add
            } else {
                return { ...prev, [id]: count + 1 }; // increase
            }
        });
    }

    function decreaseCart(id) {
        setCart((prev) => {
            const count = prev[id];

            if (count === 1) {
                const newCart = { ...prev };
                delete newCart[id]; // remove item
                return newCart;
            }

            return { ...prev, [id]: count - 1 };
        });
    }
    return (
        <div className='GroceryCard' onClick={() => {
            console.log(Grocery);

        }} >
            <div className="CardItem" id={Grocery._id} style={{ animationDelay: `${0.02}s` }} ref={boxRef}>
                <img src={Grocery.image} alt="" srcset="" />
                <h5 className='productName'>{Grocery.productName}</h5>
                <div className="rateAndper col-8">

                    {Grocery.offerRate != null ?
                        <p>₹{Grocery.offerRate}/<span style={{ textDecoration: 'line-through' }}>₹{Grocery.rate}</span></p>
                        : <p>₹{Grocery.rate}/-</p>}

                    <p>{Grocery.per}</p>

                </div>

                <div className=" btnscart">
                    {
                        (user._id !== Grocery.companyId) ?
                            <>
                                <div className="Plus" onClick={() => {
                                    handleCart(Grocery._id)
                                }}>
                                    <svg width={25} height={25} fill='green' xmlns="http://www.w3.org/2050/svg" viewBox="0 0 640 640">
                                        <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z" /></svg>
                                </div>
                                {
                                    cart[Grocery._id] &&
                                    <>
                                        <div className="number" style={{ animationDelay: '0.05s' }}>
                                            {cart[Grocery._id]}
                                        </div>
                                        <div className="minus" style={{ animationDelay: '0.08s' }} onClick={() => {
                                            decreaseCart(Grocery._id)
                                        }}>
                                            <svg width={25} height={25} fill='red' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                                <path d="M96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320z" /></svg>
                                        </div>
                                    </>
                                }</> :
                            <>
                            <div className="delete">
                                <svg width={25} height={25} fill='red' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path d="M232.7 69.9C237.1 56.8 249.3 48 263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9zM128 208L512 208L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 208zM216 272C202.7 272 192 282.7 192 296L192 488C192 501.3 202.7 512 216 512C229.3 512 240 501.3 240 488L240 296C240 282.7 229.3 272 216 272zM320 272C306.7 272 296 282.7 296 296L296 488C296 501.3 306.7 512 320 512C333.3 512 344 501.3 344 488L344 296C344 282.7 333.3 272 320 272zM424 272C410.7 272 400 282.7 400 296L400 488C400 501.3 410.7 512 424 512C437.3 512 448 501.3 448 488L448 296C448 282.7 437.3 272 424 272z"/></svg>
                            </div>
                            <div className="update">
                                <svg width={25} height={25} fill='orange' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path d="M128.1 64C92.8 64 64.1 92.7 64.1 128L64.1 512C64.1 547.3 92.8 576 128.1 576L274.3 576L285.2 521.5C289.5 499.8 300.2 479.9 315.8 464.3L448 332.1L448 234.6C448 217.6 441.3 201.3 429.3 189.3L322.8 82.7C310.8 70.7 294.5 64 277.6 64L128.1 64zM389.6 240L296.1 240C282.8 240 272.1 229.3 272.1 216L272.1 122.5L389.6 240zM332.3 530.9L320.4 590.5C320.2 591.4 320.1 592.4 320.1 593.4C320.1 601.4 326.6 608 334.7 608C335.7 608 336.6 607.9 337.6 607.7L397.2 595.8C409.6 593.3 421 587.2 429.9 578.3L548.8 459.4L468.8 379.4L349.9 498.3C341 507.2 334.9 518.6 332.4 531zM600.1 407.9C622.2 385.8 622.2 350 600.1 327.9C578 305.8 542.2 305.8 520.1 327.9L491.3 356.7L571.3 436.7L600.1 407.9z"/></svg>
                            </div>
                            </>
                    }
                </div>
                {Grocery.offerRate != null && <div className="Percentage">{discountPercentage(Grocery.rate, Grocery.offerRate)}%</div>}
            </div>
        </div>
    )
}

export default GroceryCard