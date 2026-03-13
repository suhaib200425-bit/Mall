import React, { useState } from 'react'
import './Store.css'
import { useNavigate } from 'react-router-dom'
import { API_END_POINT } from '../../assets/main'
import { useMall } from '../../Context/MallContext'
import BannerPop from '../BannerPop/BannerPop'
function Store({ StoreObj }) {
    const [BannerFile, setBannerFile] = useState()
    const [BannerImage, setBannerImage] = useState()
    const [Edit,setEdit]=useState(false)
    const { user } = useMall()
    const Navigate = useNavigate()

    return (
        <div className='Store' onClick={() => {
            window.scrollTo(0, 0)
            Navigate(`/shope/${StoreObj.category}`)
        }}>
            <img onClick={() => {
                console.log(StoreObj.coverPic);

            }} src={StoreObj.coverPic ? StoreObj.coverPic : ''} alt="" srcset="" />
            <div className="storeName">
                {StoreObj?.name}
                <br />
            </div>
            <div className="StoreFloor">
                {/* {StoreObj.Floor} */}
            </div>
            {
                (StoreObj._id == user._id) &&
                <button className="editingBtn" onClick={(e) => {
                    e.stopPropagation()
                    setEdit(true)
                }}>Edit</button>
            }
            {
                Edit&&
                <BannerPop setEdit companyimage={StoreObj.coverPic ? StoreObj.coverPic : ''} />
            }
        </div>
    )
}

export default Store