import React, { useEffect, useRef, useState } from 'react'
import './Nesto.css'
import '../../compones/TabBar/TabBAr'
import TabBar from '../../compones/TabBar/TabBAr';

import { listShopes, Nestoimage, Offer } from '../../assets/assets'
import GroceryCard from '../../compones/GroceryCard/GroceryCard';
import axios from 'axios';
import { API_END_POINT } from '../../assets/main';
import { useParams } from 'react-router-dom';
import { useMall } from '../../Context/MallContext';
import AddProduct from '../../compones/AddProduct/AddProduct';
function Nesto() {

    const { shope } = useParams()
    const [Add, setAdd] = useState(false)
    const inputRef = useRef()
    const { user,Products,setProducts } = useMall()
    const [BannerImage, setBannerImage] = useState(null)
    const [BannerImageFile, setBannerImageFile] = useState(null)
    const [Active, setActive] = useState('All')
    const token = localStorage.getItem('token')
    const getProductsApi = async (page = 1, limit = 8,categoryName = "", search = "") => {
        try {
            const res = await axios.get(`${API_END_POINT}/api/product/gets/${shope}`, {
                params: {
                    page,
                    limit,
                    categoryName,
                    search,
                },
                headers: {
                    Authorization: token
                }
            });
            console.log(res.data);

            return res.data;
        } catch (error) {
            console.log(error);
            return {
                status: false,
                message: "Failed to fetch products",
            };
        }
    };

    useEffect(() => {
        const getbanner = async () => {
            const response = await axios.get(`${API_END_POINT}/api/banner/get/${shope}`)
            console.log(response.data);
            if (response.data) {
                setBannerImage(response.data.data)
            } else {
                console.log('banner');
                console.log(response.data);
            }

        }
        getbanner()
        const products = async ()=>{
            const result = await getProductsApi();
            if(result.status){
                setProducts(result.products)
            }
        }
        products()
    }, [])
    const handleImage = async (e) => {
        const file = e.target.files[0]

        // setBannerImageFile(file);

        // setBannerImage(URL.createObjectURL(file))
        console.log(file);
        const formData = new FormData();
        formData.append("banner", file); // "image" = backend field name
        const result = await BannerUpdate(formData)
        if (result.status) {
            setBannerImage(result.data)
        } else {
            console.log(result);

        }
    };

    const BannerUpdate = async (formdata) => {
        try {
            const response = await axios.post(`${API_END_POINT}/api/banner/save`, formdata, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: token
                }
            })
            console.log(response.data);

            return response.data
        } catch (error) {
            return {
                status: false,
                message: error.message
            }
        }
    }
    return (
        <div className='Nesto'>
            <div class="NestoBanner">
                <img src={BannerImage ? BannerImage.banner : Nestoimage} alt="image" />
                <div class="bottomShade"></div>
                {
                    (user._id == shope) && <div className="">
                        <button className="editingBtn" onClick={() => {
                            inputRef.current.click()
                        }}>Edit</button>
                        <input onChange={handleImage} type="file" accept="image/*" hidden ref={inputRef} />
                    </div>
                }
            </div>
            <div className="NestoContent ">
                <div className="col-12  CardsItems">
                    <div className="col-12">
                        <div className="TABBAR">
                            <TabBar setActive={setActive} Active={Active} style />
                        </div>
                        <div class="dropdown ms-">
                            <button class="btn dropdown-toggle" data-bs-toggle="dropdown">
                                Filter Product ⋮
                            </button>

                            <ul class="dropdown-menu">
                                {
                                    listShopes.map(elem => {
                                        return <li><a class="dropdown-item" href="#">{elem.category}</a></li>
                                    })
                                }

                            </ul>

                        </div>

                    </div>
                    {
                        Products&&Products.map((elem, index) => {
                            console.log(elem);
                            
                            return <div className="col-6 col-md-2 p-2 " key={index}>
                                <GroceryCard Grocery={elem} index={index} />

                            </div>
                        })
                    }



                </div>

            </div>
            {
                Add && <AddProduct setProducts={setProducts} />
            }
            {(user._id == shope) && <div className="AppProduct" onClick={() => {
                setAdd(prev => !prev)
            }}></div>}
        </div>
    )
}

export default Nesto