
import axios from "axios"

export const post = async (data, url) => {
    const response = await axios.post(url, data).catch((err) => err.response);
    
    return response.data;
};


  