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