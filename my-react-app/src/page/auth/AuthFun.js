import axios from "axios";

export const loginUser = async (email,password) => {

    try {

        const response = await axios.post(
            "http://localhost:5000/api/user/login",
            {email,password}
        );

        return response.data;

    } catch (error) {

        console.log(error);

        return {
            status: false,
            message: error.response?.data?.message || error.message
        };

    }

};

//REGISTER

export const registerUser = async (formData) => {

    try {

        const response = await axios.post(
            "http://localhost:5000/api/user/register",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        )

        return response.data

    } catch (error) {

        return {
            status: false,
            message: error.message
        }

    }

}
