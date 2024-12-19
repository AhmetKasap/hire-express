import axios from "axios";
import { baseUrl } from "./constants";

const loginService = async (email, password) => {
    try {
        const response = await axios.post(`${baseUrl}/auth/login`, {
            email,
            password
        });
        return response.data
    } catch (error) {
        return error.response.data
    }
}


const registerService = async(firstName, lastName, email, password) => {
    try {
        const response = await axios.post(`${baseUrl}/auth/register`, {
            firstName,
            lastName,
            email,
            password
        })
        return response.data
        
    } catch (error) {
        return error.response.data
    }
}

export { loginService,registerService }

