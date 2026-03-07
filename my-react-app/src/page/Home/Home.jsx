import React, { useEffect, useState } from 'react'
import './Home.css'
import TabBar from '../../compones/TabBar/TabBAr';
import Store from '../../compones/Store/Store';
import Slider from '../../compones/Slider/Slider';
import { stores } from '../../assets/assets';
function Home() {
    const [Active, setActive] = useState('All')

    return (
        <div className='Home'>
            {/* <LeftBar /> */}
            <div className="HomeContent">

                <Slider />

                <h5>{Active} Store's</h5>
                <TabBar Active={Active} setActive={setActive} />
                <div className="row Stores">
                    {
                        stores.map(elem => {
                            return <div className="col-6 col-md-3 p-1" key={elem.Id}>
                                <Store StoreObj={elem} />
                            </div>
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default Home