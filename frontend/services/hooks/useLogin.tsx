import {AxiosInstance} from "../axios/axiosInstance";

export default function useLogin() {
    return async (email: string, password: string) => {
        try {
            const res = await AxiosInstance({
                url: '/users/login',
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: new URLSearchParams({
                    "email": email,
                    "password": password
                })
            });
            return res.data;
        } catch (err:any) {
            return err.response;
        }
    }
}
