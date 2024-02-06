import {AxiosInstance} from "../axios/axiosInstance";

export default function useGetUserById() {
    return async (id:string) => {
        try {
            const res = await AxiosInstance({
                url: '/users/' + id,
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