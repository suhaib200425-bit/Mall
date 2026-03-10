import React, { useEffect, useState } from 'react'
import './Home.css'
import TabBar from '../../compones/TabBar/TabBAr';
import Store from '../../compones/Store/Store';
import Slider from '../../compones/Slider/Slider';
import { stores } from '../../assets/assets';
import { getCompanys } from './Company';
function Home() {
    const [Active, setActive] = useState('All')
    const [Companys, setCompanys] = useState([])
    useEffect(() => {
        const getData = async () => {
            const result = await getCompanys()
            if (result.status) {
                setCompanys(result.companys)
            }
        }
        getData()
    }, [])
    return (
        <div className='Home'>
            {/* <LeftBar /> */}
            <div className="HomeContent">

                <Slider />

                <h5>{Active} Store's</h5>
                <TabBar Active={Active} setActive={setActive} />
                <div className="row Stores">
                    {
                        Companys&&Companys.map(elem => {
                            return <div className="col-6 col-md-3 p-1" key={elem._id}>
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