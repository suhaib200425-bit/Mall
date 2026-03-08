import React, { useState } from 'react'
import './Nesto.css'
import '../../compones/TabBar/TabBAr'
import TabBar from '../../compones/TabBar/TabBAr';

import {listShopes} from '../../assets/assets'
function Nesto() {
    const [Active, setActive] = useState('All')
    const Offer = [
        {
            image: 'https://i.pinimg.com/736x/05/49/07/054907a40344ab78528b01994f42f7bd.jpg',
            title: 'Tomato',
            rate: 23,
            per: '1kg',
            offerRate: 23
        },
        {
            image: 'https://i.pinimg.com/1200x/67/aa/e7/67aae7d12b6af6394c7eff82dd4471ad.jpg',
            title: 'Potato',
            rate: 28,
            per: '1kg',
            offerRate: 12
        },
        {
            image: 'https://i.pinimg.com/736x/b0/8f/48/b08f48585f510825bebbe1a9acdbc725.jpg',
            title: 'Onion',
            rate: 35,
            per: '1kg',
            offerRate: null
        },
        {
            image: 'https://i.pinimg.com/736x/4a/cc/5f/4acc5f804f89cd17ef7efe9d87c2e37b.jpg',
            title: 'Carrot',
            rate: 40,
            per: '1kg',
            offerRate: 5
        },
        {
            image: 'https://i.pinimg.com/1200x/51/23/44/5123441660081d5ef55f9c4731ce5c93.jpg',
            title: 'Cabbage',
            rate: 30,
            per: '1kg',
            offerRate: null
        },
        {
            image: 'https://i.pinimg.com/1200x/27/bf/ff/27bfffaec5483240a805f9770b6e621e.jpg',
            title: 'Cauliflower',
            rate: 45,
            per: '1kg',
            offerRate: null
        },
        {
            image: 'https://i.pinimg.com/1200x/14/39/c4/1439c497eaf3e3eed224c5da7c49aea1.jpg',
            title: 'Broccoli',
            rate: 60,
            per: '1kg',
            offerRate: 1
        },
        {
            image: 'https://i.pinimg.com/1200x/29/5a/5a/295a5a7a31d97159b48ded9ee1b97c44.jpg',
            title: 'Capsicum',
            rate: 55,
            per: '1kg',
            offerRate: 30
        },
        {
            image: 'https://i.pinimg.com/1200x/85/a6/29/85a629a5957f3994559e48794095c5b2.jpg',
            title: 'Cucumber',
            rate: 20,
            per: '1kg',
            offerRate: 15
        },
        {
            image: 'https://i.pinimg.com/1200x/e4/e5/3d/e4e53d7954350b6c75e8274e12281c51.jpg',
            title: 'Brinjal',
            rate: 32,
            per: '1kg',
            offerRate: null
        },
        {
            image: 'https://i.pinimg.com/1200x/e8/e9/d4/e8e9d4de892dbb440a3a5421ade7f4f0.jpg',
            title: 'Pumpkin',
            rate: 25,
            per: '1kg',
            offerRate: null
        },
        {
            image: 'https://i.pinimg.com/736x/e9/97/64/e99764ced2f3048651afdbf7ed2bd15e.jpg',
            title: 'Beans',
            rate: 48,
            per: '1kg',
            offerRate: null
        },
        {
            image: 'https://i.pinimg.com/736x/ec/e9/c9/ece9c9c03868ae2d265956f70b104710.jpg',
            title: 'Peas',
            rate: 70,
            per: '1kg',
            offerRate: 50
        },
        {
            image: 'https://i.pinimg.com/736x/34/ef/49/34ef49aa5a42066812f2c42d0c2e8a63.jpg',
            title: 'Chilli',
            rate: 90,
            per: '1kg',
            offerRate: 20
        },
        {
            image: 'https://i.pinimg.com/736x/ef/b0/3a/efb03afe79fc22dffa6b99b63a833e4f.jpg',
            title: 'Garlic',
            rate: 120,
            per: '1kg',
            offerRate: null
        }
    ];
   function discountPercentage(original, offer){
   return Math.round(((original - offer) / original) * 100);
}

    return (
        <div className='Nesto'>
            <div class="NestoBanner">
                <img src="https://i.pinimg.com/1200x/a6/3f/96/a63f96fd17ccc8164e349f5d295cbcfb.jpg" alt="image" />
                <div class="bottomShade"></div>
            </div>
            <div className="NestoContent ">
                <div className="col-12  CardsItems">
                    <div className="col-12">
                        <div className="TABBAR">
                            <TabBar setActive={setActive} Active={Active} style />
                        </div>
                        <div class="dropdown ms-">
                            <button class="btn dropdown-toggle" data-bs-toggle="dropdown">
                                Filter Product ⋮
                            </button>

                            <ul class="dropdown-menu">
                                {
                                    listShopes.map(elem=>{
                                        return <li><a class="dropdown-item" href="#">{elem.category}</a></li>
                                    })
                                }
                                
                            </ul>
                        </div>
                    </div>
                    {
                        Offer.map((elem, index) => {
                            return <div className="col-6 col-md-2 p-2 " key={index}>
                                <div className="CardItem">
                                    <img src={elem.image} alt="" srcset="" />
                                    <h5>{elem.title}</h5>
                                    <div className="rateAndper col-8">

                                        {elem.offerRate != null ?
                                            <p>₹{elem.offerRate}  <span style={{ textDecoration: 'line-through' }}>₹{elem.rate}</span></p>
                                            : <p>₹{elem.rate}</p>}

                                        <p>{elem.per}</p>
                                    </div>
                                    {elem.offerRate != null && <div className="Percentage">{discountPercentage(elem.rate,elem.offerRate)}%</div>}
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