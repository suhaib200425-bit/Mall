import React from 'react'
import './ProfilePop.css'
import { ProfilePic } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useMall } from '../../Context/MallContext'
function ProfilePop({ setpop }) {
    const Navigate = useNavigate()
    const { user, setUser } = useMall()
    return (
        <div className='ProfilePop'>
            {
                user._id &&
                <div className="ProfileBox">
                    <img src={user.profilePic ? user.profilePic : ProfilePic} alt="" />
                    <h5>{user.name}</h5>
                </div>
            }
            <div className="otherOtion">
                {
                    !user._id &&
                    <div className="SignIn" onClick={()=>{
                        Navigate('/auth')
                    }}>
                        <h5>Sign In</h5>
                    </div>
                }
                {
                    user._id&&
                    <>
                    <div className="Orders" 
                    onClick={()=>{
                        
                    Navigate('/order')
                    }}>
                    <h5>Orders</h5>
                </div>
                <div className="logOut" onClick={() => {
                    localStorage.setItem("token", "null")
                    Navigate('/')
                    setpop(false)
                    setUser({})
                }}>
                    <h5>Logout</h5>
                </div>
                </>
                }
            </div>
        </div>
    )
}

export default ProfilePop