import {AxiosInstance} from "../axios/axiosInstance";

export default function useDeleteUserById() {
    return async (id:string) => {
        try {
            const res = await AxiosInstance({
                url: '/users/' + id,
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