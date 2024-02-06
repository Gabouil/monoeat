import {AxiosInstance} from "../axios/axiosInstance";

export default function useGetAllUser() {
    return async () => {
        try {
            const res = await AxiosInstance({
                url: '/users',
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