import {AxiosInstance} from "../axios/axiosInstance";

export default function useDeleteRecipeById() {
    return async (id:string) => {
        try {
            const res = await AxiosInstance({
                url: '/recipes/' + id,
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