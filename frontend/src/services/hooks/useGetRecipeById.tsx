import {AxiosInstance} from "../axios/axiosInstance";

export default function useGetRecipeById() {
    return async (id:string) => {
        try {
            const res = await AxiosInstance({
                url: '/recipes/' + id,
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