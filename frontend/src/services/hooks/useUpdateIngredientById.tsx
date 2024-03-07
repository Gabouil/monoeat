import {AxiosInstance} from "../axios/axiosInstance";

interface FormData {
    id: string;
    name: string;
    category: string;
    unit: string;
    allergens: boolean;
    optional: boolean;
    optionalUnit?: string;
    optionalQuantity?: number;
    optionalPrice?: number;
}
export default function useUpdateIngredientById() {
    return async (formData: FormData) => {
        try {
            const res = await AxiosInstance({
                url: '/ingredients/' + formData.id,
                method: 'patch',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: {
                    name: formData.name,
                    category: formData.category,
                    unit: formData.unit,
                    allergens: formData.allergens,
                    optional: formData.optional,
                    optionalUnit: formData.optional ? formData.optionalUnit : undefined,
                    optionalQuantity: formData.optional ? formData.optionalQuantity : undefined,
                    optionalPrice: formData.optional ? formData.optionalPrice : undefined,
                }
            });
            return res.data;
        } catch (err:any) {
            return err.response;
        }
    }
}