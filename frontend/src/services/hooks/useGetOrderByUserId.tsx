import {AxiosInstance} from "../axios/axiosInstance";

export default function useGetOrderByUserId() {
    return async (id:string, all?:"all") => {
        try {
            const res = await AxiosInstance({
                url: '/orders/user/' + id + (all ? '?all=true' : ''),
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `9694dd6e3936a493b94b366914ea55210b15f34a51d91cb95e5ab852060faddef6f0546e11be13e4f8419c137fa2b77e2718bde0cf63478bdbbf479ed89ec9f4`
                },
            });
            return res.data;
        } catch (err:any) {
            return err.response;
        }
    }
}