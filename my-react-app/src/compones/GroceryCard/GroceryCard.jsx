import React, { useState } from 'react'
import './GroceryCard.css'
function GroceryCard({ Grocery }) {
    const [number, setnumber] = useState(0)

    function discountPercentage(original, offer) {
        return Math.round(((original - offer) / original) * 100);
    }
    return (
        <div className='GroceryCard'>
            <div className="CardItem">
                <img src={Grocery.image} alt="" srcset="" />
                <h5>{Grocery.title}</h5>
                <div className="rateAndper col-8">

                    {Grocery.offerRate != null ?
                        <p>₹{Grocery.offerRate}  <span style={{ textDecoration: 'line-through' }}>₹{Grocery.rate}</span></p>
                        : <p>₹{Grocery.rate}</p>}

                    <p>{Grocery.per}</p>

                </div>

                <div className=" btnscart">
                    <div className="Plus" onClick={() => {
                        setnumber(prev => prev + 1)
                    }}>
                        <svg width={25} height={25} fill='red' xmlns="http://www.w3.org/2050/svg" viewBox="0 0 640 640">
                            <path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z" /></svg>
                    </div>
                    {
                        number != 0 &&
                        <>
                            <div className="number" style={{animationDelay:'0.2s'}}>
                                {number}
                            </div>
                            <div className="minus" style={{animationDelay:'0.4s'}} onClick={() => {
                                setnumber(prev => prev - 1)
                            }}>
                                <svg width={25} height={25} fill='green' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                    <path d="M96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320z" /></svg>
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