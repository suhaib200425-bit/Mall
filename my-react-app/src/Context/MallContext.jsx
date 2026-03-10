import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { API_END_POINT } from "../assets/main";
const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [user, setUser] = useState({});
    const [cart, setCart] = useState({})

    useEffect(() => {
        const apiworking = async () => {
            console.log('start');

            const response = await axios.get(`${API_END_POINT}`)
            console.log(response.data);

        }
        apiworking()
    })

    return (
        <AppContext.Provider value={{ user, setUser, cart, setCart }}>
            {children}
        </AppContext.Provider>
    );
};

export const useMall = () => {
    return useContext(AppContext)
}