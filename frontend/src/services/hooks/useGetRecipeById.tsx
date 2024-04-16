import {AxiosInstance} from "../axios/axiosInstance";

export default function useGetRecipeById() {
    return async (id:string) => {
        try {
            const res = await AxiosInstance({
                url: '/recipes/' + id,
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `9694dd6e3936a493b94b366914ea55210b15f34a51d91cb95e5ab852060faddef6f0546e11be13e4f8419c137fa2b77e2718bde0cf63478bdbbf479ed89ec9f4`
                },
            });
            console.log(res.data);
            return res.data;
        } catch (err:any) {
            return err.response;
        }
    }
}