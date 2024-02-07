import {AxiosInstance} from "../axios/axiosInstance";

export default function useGetAllIngredient() {
    return async () => {
        try {
            const res = await AxiosInstance({
                url: '/ingredients',
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