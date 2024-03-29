import {AxiosInstance} from "../axios/axiosInstance";

export default function useGetIngredientById() {
    return async (id:string) => {
        try {
            const res = await AxiosInstance({
                url: '/ingredients/' + id,
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