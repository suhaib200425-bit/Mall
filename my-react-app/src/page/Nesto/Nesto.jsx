import React, { useEffect, useState } from 'react'
import './Nesto.css'
import '../../compones/TabBar/TabBAr'
import TabBar from '../../compones/TabBar/TabBAr';

import {listShopes, Nestoimage, Offer} from '../../assets/assets'
import GroceryCard from '../../compones/GroceryCard/GroceryCard';
function Nesto() {
    const [Active, setActive] = useState('All')
    
    return (
        <div className='Nesto'>
            <div class="NestoBanner">
                <img src={Nestoimage} alt="image" />
                <div class="bottomShade"></div>
                <button className="editingBtn">Edit</button>
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
                                <GroceryCard Grocery={elem} index={index} />
                               
                            </div>
                        })
                    }


                </div>
            </div>
        </div>
    )
}

export default Nesto