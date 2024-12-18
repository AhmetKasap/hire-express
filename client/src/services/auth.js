import axios from "axios";
import { baseUrl } from "./constants";

const loginService = async (email, password) => {
    try {
        const response = await axios.post(`${baseUrl}/auth/login`, {
            email,
            password
        });
        return response
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};

export { loginService };

