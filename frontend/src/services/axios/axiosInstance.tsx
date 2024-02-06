import axios from "axios";
const baseURL = 'http://localhost:3000/'

export const AxiosInstance = axios.create({
    baseURL: baseURL,
    // withCredentials: true
})