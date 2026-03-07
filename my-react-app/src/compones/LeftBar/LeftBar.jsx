import React from 'react'
import './LeftBar.css'
import { Accessories, BeautyCosmetics, SuperMarket } from '../../assets/assets'
function LeftBar() {
    const listShopes=[
        {
            icon:SuperMarket,
            category:'Supermarket'
        },{
            icon: Accessories,
            category:'Accessories'
        },{
            icon: BeautyCosmetics,
            category:'Beauty & Cosmetics'
        },{
            icon: Accessories,
            category:'Accessories'
        }
    ]
  return (
    <div className='LeftBar'>
        {
            listShopes.map(elem=>{
                return <div className="mb-2 LeftBarIcon">
                    <img src={elem.icon} alt="" srcset="" />
                    <span >{elem.category}</span>
                </div>
            })
        }
        
    </div>
  )
}

export default LeftBar