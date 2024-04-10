import {AxiosInstance} from '../axios/axiosInstance';

interface FormData {
    id: string;
    status: "pending" | "paid" | "delivered" | "cancelled";
}

export default function useUpdateOrderById() {
    return async (formData: FormData) => {
        try {
            const data = new FormData();
            data.append('status', formData.status);

            const res = await AxiosInstance({
                url: '/orders/' + formData.id,
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