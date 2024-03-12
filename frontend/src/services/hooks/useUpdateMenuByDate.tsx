import {AxiosInstance} from '../axios/axiosInstance';

interface FormData {
    recipes: string[];
    date: string;
}

export default function useUpdateMenuByDate() {
    return async (formData: FormData) => {
        const data = new FormData();
        data.append('recipes', JSON.stringify(formData.recipes));

        try {
            const res = await AxiosInstance({
                url: '/menus/' + formData.date,
                method: 'patch',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data: data
            })
            return res.data
        } catch (err: any) {
            return err.response.data.error;
        }
    }
}