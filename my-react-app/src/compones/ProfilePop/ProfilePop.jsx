import React from 'react'
import './ProfilePop.css'
import { ProfilePic } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useMall } from '../../Context/MallContext'
import { API_END_POINT } from '../../assets/main'
function ProfilePop({ setpop }) {
    const Navigate = useNavigate()
    const { user } = useMall()
    return (
        <div className='ProfilePop'>
            {
                user &&
                <div className="ProfileBox">
                    <img src={user.profilePic ? user.profilePic : ProfilePic} alt="" />
                    <h5>{user.name}</h5>
                </div>
            }
            <div className="otherOtion">

                <div className="Orders">
                    <h5>Orders</h5>
                </div>
                <div className="logOut" onClick={() => {
                    localStorage.setItem("token", "null")
                    Navigate('/')
                    setpop(false)
                }}>
                    <h5>Logout</h5>
                </div>
            </div>
        </div>
    )
}

export default ProfilePop