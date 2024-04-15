import axios from "axios";
const baseURL = 'http://gabrielgoldbronn.com:3000/'

export const AxiosInstance = axios.create({
    baseURL: baseURL,
    // withCredentials: true
})