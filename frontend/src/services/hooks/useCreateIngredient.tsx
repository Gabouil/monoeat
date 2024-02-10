import {AxiosInstance} from '../axios/axiosInstance';

interface FormData {
    name: string;
    category: string;
    allergens: boolean;
    optional: boolean;
}

export default function useCreateIngredient() {
    return async (formData: FormData) => {
        try {
            const res = await AxiosInstance({
                url: '/ingredients',
                method: 'post',
                headers: {
                    'Content-Type':  'multipart/form-data'
                },
                data: {
                    name: formData.name,
                    category: formData.category,
                    allergens: formData.allergens,
                    optional: formData.optional
                }
            })
            return res.data
        } catch (err: any) {
            return err.response.data.error;
        }
    }
}