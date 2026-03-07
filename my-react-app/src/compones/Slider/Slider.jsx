import React, { useEffect, useState } from 'react'
import './Slider.css'
import { Banners } from '../../assets/assets'
function Slider() {
    
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % Banners.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);
    return (
        <div className="offerSlider ">
            <div
                className="offerContainer"
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {Banners.map((offer, index) => (
                    <div className="offerSlide" key={index}>
                        <img src={offer} alt="" srcset="" />
                    </div>
                ))}
            </div>

            <div className="dots">
                {Banners.map((_, i) => (
                    <span
                        key={i}
                        className={index === i ? "dot active" : "dot"}
                        onClick={() => setIndex(i)}
                    ></span>
                ))}
            </div>
        </div>
    )
}

export default Slider