import React from 'react'
import './Store.css'
import { useNavigate } from 'react-router-dom'
import { API_END_POINT } from '../../assets/main'
function Store({StoreObj}) {
    const Navigate=useNavigate()
  return (
    <div className='Store' onClick={()=>{
        window.scrollTo(0,0)
        Navigate(`/shope/category`)
    }}>
        <img src={StoreObj.coverPic?`${API_END_POINT}${StoreObj?.coverPic}`:''} alt="" srcset="" />
        <div className="storeName">
            {StoreObj?.name}
            <br />
        </div>
        <div className="StoreFloor">
            {/* {StoreObj.Floor} */}
        </div>
    </div>
  )
}

export default Store