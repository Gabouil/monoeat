import {AxiosInstance} from "../axios/axiosInstance";

export default function useGetAllRecipe() {
    return async () => {
        try {
            const res = await AxiosInstance({
                url: '/recipes',
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