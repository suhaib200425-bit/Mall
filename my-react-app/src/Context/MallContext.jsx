import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { API_END_POINT } from "../assets/main";
import { toast } from "react-toastify";
const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [user, setUser] = useState({});
    const [cart, setCart] = useState({})
    const [Companys, setCompanys] = useState([])
    const [Categorys, setCategorys] = useState([])
        const [Products, setProducts] = useState([])
    const token = localStorage.getItem('token')
    useEffect(() => {

        async function checklogged() {
            const response = await axios.get(`${API_END_POINT}/api/user/logged`, {
                headers: {
                    Authorization: token
                }
            })
            console.log('USER LOGGEd');
            console.log(response.data);
            if (response.data.status) {
                toast.success(response.data.message)
                setUser(response.data.user)
            } else {
                toast.error(response.data.message)
            }

        }
        checklogged()
        allCartItems()
        Promise.allSettled([Apiworking(), getCategorys()])
            .then((data) => {

                console.log('PROMISE');
                // setCompanys(data[1].value.companys)
                setCategorys(data[1].value.categorys)
                console.log(data);
                console.log('PROMISE END');
            })
    }, [])

    async function getCategorys() {
        try {
            const response = await axios.get(`${API_END_POINT}/api/user/categorys`)
            return response.data;
        } catch (error) {
            return {
                status: false,
                message: error.response?.data?.message || error.message
            };
        }
    }

    async function Apiworking() {
        try {
            const response = await axios.get(`${API_END_POINT}`)
            return response.data;

        } catch (error) {
            return {
                status: false,
                message: error.response?.data?.message || error.message
            };
        }
    }

    async function allCartItems() {
        try {
            const response = await axios.get(`${API_END_POINT}/api/cart/get`,{
                headers:{
                    Authorization:token
                }
            })

            if(response.data.status){
                const cartItem=response.data.carts
                console.log("Cart");
                console.log(cartItem);
                
                cartItem.map(elem=>{
                    setCart(prev=>{
                        return {...prev,[elem.productId._id]:elem}
                    })
                })
                
            }else{
                alert(response.data.message)
            }

        } catch (error) {
           alert(error.response?.data?.message || error.message)
        }
    }

    // async function getCompanys(page = 1) {
    //     try {
    //         const response = await axios.get(
    //             `${API_END_POINT}/api/user/company?page=${page}`
    //         );

    //         return response.data;

    //     } catch (error) {
    //         return {
    //             status: false,
    //             message: error.response?.data?.message || error.message
    //         };
    //     }
    // };

    return (
        <AppContext.Provider value={{
            user,
            setUser,
            cart,
            setCart,
            Companys,
            setCompanys,
            Categorys,
            setCategorys,
            Products,
            setProducts,
            //other categorys
            getCategorys,
    
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useMall = () => {
    return useContext(AppContext)
}