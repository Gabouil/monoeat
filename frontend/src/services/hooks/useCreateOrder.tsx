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
                },
                data: data
            })
            return res.data
        } catch (err: any) {
            return err.response.data.error;
        }
    }
}