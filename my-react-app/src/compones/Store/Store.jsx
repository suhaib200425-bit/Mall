import React from 'react'
import './Store.css'
import { useNavigate } from 'react-router-dom'
function Store({StoreObj}) {
    const Navigate=useNavigate()
  return (
    <div className='Store' onClick={()=>{
        window.scrollTo(0,0)
        Navigate(`/shope/${StoreObj.to}`)
    }}>
        <img src={StoreObj?.Image} alt="" srcset="" />
        <div className="storeName">
            {StoreObj.Name}
            <br />
        </div>
        <div className="StoreFloor">
            {StoreObj.Floor}
        </div>
    </div>
  )
}

export default Store