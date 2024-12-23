import axios from "axios";
import { baseUrl } from "./constants";

const userValidateService = async (token) => {
    try {
        const response = await axios.get(`${baseUrl}/users/validate`,
            { headers: {Authorization: `Bearer ${token}`}}
        )
        return response.data
    } catch (error) {
        return error.response ? error.response.data : { error: "Network Error" }
    }
}

const getUserByIdService = async(id) => {
    try {
        const response = await axios.get(`${baseUrl}/users/${id}`)
        return response.data
        
    } catch (error) {
        return error.response ? error.response.data : { error: "Network Error" }
    }
}

export { userValidateService, getUserByIdService }
