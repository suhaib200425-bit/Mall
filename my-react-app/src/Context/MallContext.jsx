import { createContext, useContext, useState } from "react";
const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [user, setUser] = useState({});
    const [cart, setCart] = useState({})


    return (
        <AppContext.Provider value={{ user, setUser, cart, setCart }}>
            {children}
        </AppContext.Provider>
    );
};

export const useMall = () => {
    return useContext(AppContext)
}