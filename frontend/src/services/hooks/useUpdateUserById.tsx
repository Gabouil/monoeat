import {AxiosInstance} from "../axios/axiosInstance";


interface DeliveryInfo {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    company: string;
    country: string;
    address: string;
    address2: string;
    postalCode: string;
    city: string;
}

interface FormData {
    id: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    password?: string;
    favorites?: string[];
    role?: 'user' | 'admin';
    billingInfo?: DeliveryInfo;
    deliveryInfo?: DeliveryInfo;
}
export default function useUpdateUserById() {
    return async (formData: FormData) => {
        try {
            const data = new FormData();
            data.append('id', formData.id);
            data.append('firstname', formData.firstname || '');
            data.append('lastname', formData.lastname || '');
            data.append('email', formData.email || '');
            data.append('phone', formData.phone || '');
            data.append('password', formData.password || '');
            if (formData.favorites) {
                data.append('favorites', JSON.stringify(formData.favorites));
            }
            data.append('role', formData.role || '');
            if (formData.billingInfo) {
                data.append('billingInfo', JSON.stringify(formData.billingInfo));
            }
            if (formData.deliveryInfo) {
                data.append('deliveryInfo', JSON.stringify(formData.deliveryInfo));
            }

            const res = await AxiosInstance({
                url: '/users/' + formData.id,
                method: 'patch',
                headers: {
                    'Content-Type':  'multipart/form-data',
                    "Authorization": `9694dd6e3936a493b94b366914ea55210b15f34a51d91cb95e5ab852060faddef6f0546e11be13e4f8419c137fa2b77e2718bde0cf63478bdbbf479ed89ec9f4`
                },
                data: data
            });
            return res.data;
        } catch (err:any) {
            return err.response;
        }
    }
}