import {AxiosInstance} from "../axios/axiosInstance";

export default function useLogin() {
    return async (email: string, password: string) => {
        try {
            const res = await AxiosInstance({
                url: '/users/login',
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data'
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
