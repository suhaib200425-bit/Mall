import React from 'react'
import './ProfilePop.css'
import { ProfilePic } from '../../assets/assets'
function ProfilePop() {
    return (
        <div className='ProfilePop'>
            <div className="ProfileBox">
                <img src={ProfilePic} alt="" />
                <h5>Suhaib koppath</h5>
            </div>
            <div className="otherOtion">

                <div className="Orders">
                    <h5>Orders</h5>
                </div>
                <div className="logOut">
                    <h5>Logout</h5>
                </div>
            </div>
        </div>
    )
}

export default ProfilePop