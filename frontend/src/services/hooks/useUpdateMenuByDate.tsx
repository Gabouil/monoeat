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