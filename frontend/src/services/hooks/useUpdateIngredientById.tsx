import {AxiosInstance} from "../axios/axiosInstance";

interface FormData {
    id: string;
    name: string;
    category: string;
    allergens: boolean;
    facutlative: boolean;
}
export default function useUpdateIngredientById() {
    return async (formData: FormData) => {
        try {
            const res = await AxiosInstance({
                url: '/ingredients/' + formData.id,
                method: 'patch',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: new URLSearchParams({
                    name: formData.name,
                    category: formData.category,
                    allergens: formData.allergens.toString(),
                    facutlative: formData.facutlative.toString()
                })
            });
            return res.data;
        } catch (err:any) {
            return err.response;
        }
    }
}