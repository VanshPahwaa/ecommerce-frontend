import axios from "axios";

export const BASE_URL="https://yourcart-backend.onrender.com";

export const myAxios=axios.create({
    baseURL:BASE_URL,
    allowAbsoluteUrls: false ,
    withCredentials:true,
    headers:{
        "Content-Type":"application/json"
    }

})

