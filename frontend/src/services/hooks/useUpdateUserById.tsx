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
    deliveryInfo?: DeliveryInfo;
}
export default function useUpdateUserById() {
    return async (formData: FormData) => {
        try {
            const res = await AxiosInstance({
                url: '/users/' + formData.id,
                method: 'patch',
                headers: {
                    'Content-Type':  'multipart/form-data'
                },
                data: {
                    firstname: formData.firstname,
                    lastname: formData.lastname,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                    favorites: formData.favorites,
                    role: formData.role,
                    deliveryInfo: formData.deliveryInfo
                }
            });
            return res.data;
        } catch (err:any) {
            return err.response;
        }
    }
}