import React, { useState } from 'react'
import './NavBar.css'
import { Logo, ProfilePic } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import ProfilePop from '../ProfilePop/ProfilePop'
function NavBar() {
    const Navigate = useNavigate()
    const [pop, setpop] = useState(false)
    return (
        <div className='NavBar'>
            <div className="leftBar">
                <img src={Logo} alt="" srcset="" onClick={() => {
                    window.scrollTo(0, 0)
                    Navigate('/')
                }} />
            </div>
            <div className="centerBar">
                <svg className='me-1' width={30} height={30} fill='gray' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z" /></svg>
                <input type="text" className='SearchInput' placeholder='Search Store' />
            </div>
            <div className="rightBar">
                <div className="SearchIcon">
                    <svg className='' width={30} height={30} fill='white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z" /></svg>

                </div>
                <div className="CartIcon" onClick={() => {
                    window.scrollTo(0, 0)
                    Navigate('/cart')
                }} >                    <svg width={30} height={30} fill='white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path d="M320 64C326.6 64 332.9 66.7 337.4 71.5L481.4 223.5L481.9 224L560 224C577.7 224 592 238.3 592 256C592 270.5 582.4 282.7 569.2 286.7L523.1 493.9C516.6 523.2 490.6 544 460.6 544L179.3 544C149.3 544 123.3 523.2 116.8 493.9L70.8 286.7C57.6 282.8 48 270.5 48 256C48 238.3 62.3 224 80 224L158.1 224L158.6 223.5L302.6 71.5C307.1 66.7 313.4 64 320 64zM320 122.9L224.2 224L415.8 224L320 122.9zM240 328C240 314.7 229.3 304 216 304C202.7 304 192 314.7 192 328L192 440C192 453.3 202.7 464 216 464C229.3 464 240 453.3 240 440L240 328zM320 304C306.7 304 296 314.7 296 328L296 440C296 453.3 306.7 464 320 464C333.3 464 344 453.3 344 440L344 328C344 314.7 333.3 304 320 304zM448 328C448 314.7 437.3 304 424 304C410.7 304 400 314.7 400 328L400 440C400 453.3 410.7 464 424 464C437.3 464 448 453.3 448 440L448 328z" /></svg>
                </div>
                <div className="ProfileIcon" onClick={() => {
                    setpop(prev => !prev)
                }} style={{ backgroundImage: `url(${ProfilePic})` }}></div>
            </div>
            {pop &&
                <div className="NavProfile">
                    <ProfilePop />
                </div>
            }
        </div>
    )
}

export default NavBar