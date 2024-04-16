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
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `9694dd6e3936a493b94b366914ea55210b15f34a51d91cb95e5ab852060faddef6f0546e11be13e4f8419c137fa2b77e2718bde0cf63478bdbbf479ed89ec9f4`
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