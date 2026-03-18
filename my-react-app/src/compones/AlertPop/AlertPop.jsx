import React from 'react'
import './AlertPop.css'
import { API_END_POINT } from '../../assets/main'
import { useMall } from '../../Context/MallContext'
import axios from 'axios'
function AlertPop({ Product, setDelete }) {
const token = localStorage.getItem('token')
const {setProducts}= useMall()
    const deleteProduct = async () => {
        const response = await axios.delete(`${API_END_POINT}/api/product/delete/${Product._id}`, {
            headers: {
                Authorization: token
            },
        })
        console.log(response.data);
        
        if(response.data.status){
            setProducts(prev=>{
                const filterdata=prev.filter((item)=>item._id!=Product._id)
                return filterdata
            })
             setDelete(false)
        }else{
            alert(response.data.message)
        }
    }

    return (
        <div className='AlertPop'>
            <div className="col-10 delete" onClick={()=>{
                deleteProduct()
            }}>
                Delete
            </div>
            <div className="col-10 Cancel" onClick={() => {
                setDelete(false)
            }}>
                Cancel
            </div>
        </div>
    )
}

export default AlertPop
