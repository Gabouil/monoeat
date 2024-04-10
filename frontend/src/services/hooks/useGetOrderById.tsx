import {AxiosInstance} from "../axios/axiosInstance";

export default function useGetOrderById() {
    return async (id:string) => {
        try {
            const res = await AxiosInstance({
                url: '/orders/' + id,
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            console.log(res.data);
            return res.data;
        } catch (err:any) {
            return err.response;
        }
    }
}