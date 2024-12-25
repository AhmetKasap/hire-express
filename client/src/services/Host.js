const { baseUrl } = require("./constants")
import axios from "axios"

const createHostService = async(formData, token) => {
    try {
        const response = await axios.post(`${baseUrl}/hosts`,
            formData,
            { headers: {Authorization: `Bearer ${token}`}}
        )

        return response.data

  
  
      } catch (error) {
        console.error(error)
        
      }
}

export {createHostService}