import React, { useEffect } from 'react'
import './Splash.css'
import { Logo } from '../../assets/assets'
import axios from "axios"
import { API_END_POINT } from '../../assets/main'
import { useMall } from '../../Context/MallContext'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
function Splash() {
    const token = localStorage.getItem('token')
    const { setUser } = useMall()
    const Navigate = useNavigate()
    useEffect(() => {
        console.log(token);

        async function checklogged() {
            const response = await axios.get(`${API_END_POINT}/api/user/logged`, {
                headers: {
                    Authorization: token
                }
            })
            console.log(response.data);
            if (response.data.status) {
                toast.success(response.data.message)
                const user = response.data.user
                setUser(user)
                Navigate('/home')
            }else{
                Navigate('/home')
                toast.error(response.data.message)
            }

        }
        checklogged()
    }, [])
    return (
        <div className='Splash'>
            <img src={Logo} alt="" srcset="" />

            <div class="loader"></div>
        </div>
    )
}

export default Splash