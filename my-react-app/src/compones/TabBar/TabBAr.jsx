import React, { useEffect, useState } from 'react'
import './TabBar.css'
import { useMall } from '../../Context/MallContext'
import { API_END_POINT } from '../../assets/main'
import axios from 'axios'



function TabBar({ setActive, Active, style }) {
    const { Categorys,setCompanys } = useMall()
    useEffect(() => {
        const GetCategoryCompany = async () => {
            const response = await axios.get(`${API_END_POINT}/api/user/company/${Active}`)
            console.log(response.data);
            setCompanys(response.data.companys)
        }
        const GetAllCompanys = async () => {
            const result = await axios.get(`${API_END_POINT}/api/user/company`)
            console.log(result.data.companys);
            setCompanys(result.data.companys)
        }
        if (Active) {
            GetCategoryCompany()
        }else{
            GetAllCompanys()
        }
    }, [Active])
    return (
        <div className='TabBar mb-2'>
            {
                Categorys && Categorys.map((elem, i) => {
                    return <div key={i} className={Active == elem ? `Tab ${!style && 'ActiveTab'}` : `Tab ${style && ' ActiveTab ActiveTabStyle'}`} onClick={() => {
                        setActive(elem)
                        if (elem != Active)
                            setActive(elem)
                        else
                            setActive(null)
                    }}>
                        {elem}
                    </div>
                })
            }
        </div>
    )
}

export default TabBar