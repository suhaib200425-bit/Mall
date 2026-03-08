import React, { useState } from 'react'
import './TabBar.css'
import { listShopes } from '../../assets/assets'



function TabBar({setActive,Active,style}) {
    
    return (
        <div className='TabBar mb-2'>
            {
                listShopes.map((elem, i) => {
                    return <div className={Active==elem.category?`Tab ${!style&&'ActiveTab'}`:`Tab ${style&&' ActiveTab ActiveTabStyle'}`} key={i} onClick={()=>{
                        setActive(elem.category)
                    }}>
                        {elem.category}
                    </div>
                })
            }
        </div>
    )
}

export default TabBar