import React from 'react'
import './Nesto.css'
function Nesto() {
    const Offer = [
        {
            image: 'https://i.pinimg.com/736x/05/49/07/054907a40344ab78528b01994f42f7bd.jpg',
            title: 'Tomato',
            rate: 23,
            per: '1kg'
        },
        {
            image: 'https://i.pinimg.com/1200x/67/aa/e7/67aae7d12b6af6394c7eff82dd4471ad.jpg',
            title: 'Potato',
            rate: 28,
            per: '1kg'
        },
        {
            image: 'https://i.pinimg.com/736x/b0/8f/48/b08f48585f510825bebbe1a9acdbc725.jpg',
            title: 'Onion',
            rate: 35,
            per: '1kg'
        },
        {
            image: 'https://i.pinimg.com/736x/4a/cc/5f/4acc5f804f89cd17ef7efe9d87c2e37b.jpg',
            title: 'Carrot',
            rate: 40,
            per: '1kg'
        },
        {
            image: 'https://i.pinimg.com/1200x/51/23/44/5123441660081d5ef55f9c4731ce5c93.jpg',
            title: 'Cabbage',
            rate: 30,
            per: '1kg'
        },
        {
            image: 'https://i.pinimg.com/1200x/27/bf/ff/27bfffaec5483240a805f9770b6e621e.jpg',
            title: 'Cauliflower',
            rate: 45,
            per: '1kg'
        },
        {
            image: 'https://i.pinimg.com/1200x/14/39/c4/1439c497eaf3e3eed224c5da7c49aea1.jpg',
            title: 'Broccoli',
            rate: 60,
            per: '1kg'
        },
        {
            image: 'https://i.pinimg.com/736x/43/2d/8a/432d8a1c3b4e5f6a7d8c9b0e1f2a3b4c.jpg',
            title: 'Capsicum',
            rate: 55,
            per: '1kg'
        },
        {
            image: 'https://i.pinimg.com/736x/5c/9f/6a/5c9f6a3d1b2c4e5f7a8d9b0c1e2f3a4b.jpg',
            title: 'Cucumber',
            rate: 20,
            per: '1kg'
        },
        {
            image: 'https://i.pinimg.com/736x/6a/7d/3c/6a7d3c9b1e2f4a5b6c7d8e9f0a1b2c3d.jpg',
            title: 'Brinjal',
            rate: 32,
            per: '1kg'
        },
        {
            image: 'https://i.pinimg.com/736x/8c/4f/2a/8c4f2a1b3c5d6e7f8a9b0c1d2e3f4a5b.jpg',
            title: 'Pumpkin',
            rate: 25,
            per: '1kg'
        },
        {
            image: 'https://i.pinimg.com/736x/7b/2a/4e/7b2a4e1c3d5f6a7b8c9d0e1f2a3b4c5d.jpg',
            title: 'Beans',
            rate: 48,
            per: '1kg'
        },
        {
            image: 'https://i.pinimg.com/736x/9a/3c/5d/9a3c5d1e2f4a6b7c8d9e0f1a2b3c4d5e.jpg',
            title: 'Peas',
            rate: 70,
            per: '1kg'
        },
        {
            image: 'https://i.pinimg.com/736x/4b/6d/8e/4b6d8e1c3a5f7b9d0e2f4a6c8b1d3e5f.jpg',
            title: 'Chilli',
            rate: 90,
            per: '1kg'
        },
        {
            image: 'https://i.pinimg.com/736x/3e/7f/1a/3e7f1a4c6b8d9e0f2a3c5b7d8e1f4a6c.jpg',
            title: 'Garlic',
            rate: 120,
            per: '1kg'
        }
    ];

    return (
        <div className='Nesto'>
            <div class="NestoBanner">
                <img src="https://i.pinimg.com/1200x/a6/3f/96/a63f96fd17ccc8164e349f5d295cbcfb.jpg" alt="image" />
                <div class="bottomShade"></div>
            </div>
            <div className="NestoContent ">
                <div className="col-12  CardsItems">
                    {
                        Offer.map((elem, index) => {
                            return <div className="col-6 col-md-2 p-2 " key={index}>
                                <div className="CardItem">
                                    <img src={elem.image} alt="" srcset="" />
                                    <h5>{elem.title}</h5>
                                    <p><strong>{elem.rate}</strong>{elem.per}</p>

                                </div>
                            </div>
                        })
                    }


                </div>
            </div>
        </div>
    )
}

export default Nesto