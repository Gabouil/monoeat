import {AxiosInstance} from "../axios/axiosInstance";

export default function useDeleteIngredientById() {
    return async (id:string) => {
        try {
            const res = await AxiosInstance({
                url: '/ingredients/' + id,
                method: 'delete',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            });
            return res.data;
        } catch (err:any) {
            return err.response;
        }
    }
}