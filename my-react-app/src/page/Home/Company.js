import axios from "axios";
import { API_END_POINT } from "../../assets/main";

export const getCompanys = async (page = 1) => {
    try {
        const response = await axios.get(
            `${API_END_POINT}/api/user/company?page=${page}`
        );
        console.log(response.data);
        
        return response.data;

    } catch (error) {
        return {
            status: false,
            message: error.response?.data?.message || error.message
        };
    }
};