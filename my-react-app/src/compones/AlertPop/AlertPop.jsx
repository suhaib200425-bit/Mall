import React from 'react'
import './AlertPop.css'
import GroceryCard from '../GroceryCard/GroceryCard'
function AlertPop({Product,setDelete}) {
  return (
    <div className='AlertPop'>
        <div className="col-10 delete">
            Delete
        </div>
        <div className="col-10 Cancel" onClick={()=>{
            setDelete(false)
        }}>
            Cancel
        </div>
    </div>
  )
}

export default AlertPop
