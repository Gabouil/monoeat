import {AxiosInstance} from "../axios/axiosInstance";

export default function useGetAllOrder() {
    return async () => {
        try {
            const res = await AxiosInstance({
                url: '/orders',
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            return res.data;
        } catch (err:any) {
            return err.response;
        }
    }
}