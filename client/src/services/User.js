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

const editUserService = async(token, data) => {
    try {
        const response = await axios.put(`${baseUrl}/users`,
            data,
            { headers: {Authorization: `Bearer ${token}`}}
        )
        return response.data
        
    } catch (error) {
        
    }
}

const editAvatarService = async(formData, token) => {
    try {
        const response = await axios.put(`${baseUrl}/users/avatar`,
            formData,
            { headers: {Authorization: `Bearer ${token}`}}
        )

        return response.data

  
  
      } catch (error) {
        
      }
}

const getAvatarService = async(token) => {
    try {
        const response = await axios.get(`${baseUrl}/users/validate`, 
            { headers: {Authorization: `Bearer ${token}`}}
        )
        return response.data.data.avatar
        
    } catch (error) {
        return error.response ? error.response.data : { error: "Network Error" }
    }
}


export { userValidateService, getUserByIdService,editUserService, editAvatarService, getAvatarService }
