import {AxiosInstance} from "../axios/axiosInstance";

export default function useLogin() {
    return async (email: string, password: string) => {
        try {
            const res = await AxiosInstance({
                url: '/users/login',
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `9694dd6e3936a493b94b366914ea55210b15f34a51d91cb95e5ab852060faddef6f0546e11be13e4f8419c137fa2b77e2718bde0cf63478bdbbf479ed89ec9f4`
                },
                data:{
                    "email": email,
                    "password": password
                }
            });
            return res.data;
        } catch (err:any) {
            return err.response;
        }
    }
}
