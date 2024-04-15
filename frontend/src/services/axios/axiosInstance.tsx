import axios from "axios";
const baseURL = 'https://api.monoeat.gabrielgoldbronn.com/'

export const AxiosInstance = axios.create({
    baseURL: baseURL,
    // withCredentials: true
})