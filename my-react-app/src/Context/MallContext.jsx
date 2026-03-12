import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { API_END_POINT } from "../assets/main";
const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [user, setUser] = useState({});
    const [cart, setCart] = useState({})
    const [Companys, setCompanys] = useState([])
    const [Categorys, setCategorys] = useState([])

    useEffect(() => {
        Promise.allSettled([ Apiworking(),getCategorys()])
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
            //other categorys
            getCategorys
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useMall = () => {
    return useContext(AppContext)
}