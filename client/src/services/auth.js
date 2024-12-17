import axios from "axios";

const loginService = async (email, password) => {
    try {
        const response = await axios.post("http://localhost:5000/api/v1/auth/login", {
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};

export { loginService };