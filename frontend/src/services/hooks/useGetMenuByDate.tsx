import {AxiosInstance} from "../axios/axiosInstance";

export default function useGetMenuByDate() {
    return async (date:string) => {
        try {
            const res = await AxiosInstance({
                url: '/menus/' + date,
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