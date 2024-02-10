import {AxiosInstance} from '../axios/axiosInstance';

interface FormData {
    name: string;
    category: string;
    unit: string;
    allergens: boolean;
    optional: boolean;
}

export default function useCreateIngredient() {
    return async (formData: FormData) => {
        try {
            console.log(formData)
            const res = await AxiosInstance({
                url: '/ingredients',
                method: 'post',
                headers: {
                    'Content-Type':  'multipart/form-data'
                },
                data: {
                    name: formData.name,
                    category: formData.category,
                    unit: formData.unit,
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