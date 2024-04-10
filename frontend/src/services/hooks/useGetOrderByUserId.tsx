import {AxiosInstance} from "../axios/axiosInstance";

export default function useGetOrderByUserId() {
    return async (id:string, all?:"all") => {
        try {
            const res = await AxiosInstance({
                url: '/orders/user/' + id + (all ? '?all=true' : ''),
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