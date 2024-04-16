import {AxiosInstance} from '../axios/axiosInstance';

interface recipe {
    id: string;
    quantity: number;
}
interface FormData {
    user: string;
    recipes: recipe[];
}

export default function useCreateOrder() {
    return async (formData: FormData) => {
        try {
            if (formData.recipes.length === 0) {
                return "No recipes in the cart";
            }

            const data = new FormData();
            data.append('user', formData.user);
            data.append('recipes', JSON.stringify(formData.recipes));

            const res = await AxiosInstance({
                url: '/orders',
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `9694dd6e3936a493b94b366914ea55210b15f34a51d91cb95e5ab852060faddef6f0546e11be13e4f8419c137fa2b77e2718bde0cf63478bdbbf479ed89ec9f4`
                },
                data: data
            })
            return res.data
        } catch (err: any) {
            return err.response.data.error;
        }
    }
}