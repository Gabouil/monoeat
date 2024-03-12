import {AxiosInstance} from '../axios/axiosInstance';

interface FormData {
    recipes: string[];
    date: string;
}

export default function useCreateMenu() {
    return async (formData: FormData) => {
        try {
            const res = await AxiosInstance({
                url: '/menus',
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data: formData
            })
            return res.data
        } catch (err: any) {
            return err.response.data.error;
        }
    }
}