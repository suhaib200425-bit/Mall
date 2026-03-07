import React from 'react'
import './Store.css'
function Store({StoreObj}) {
  return (
    <div className='Store'>
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