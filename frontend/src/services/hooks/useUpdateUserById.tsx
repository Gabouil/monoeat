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

            console.log(data.get('favorites'))
            console.log(data.get('id'))

            const res = await AxiosInstance({
                url: '/users/' + formData.id,
                method: 'patch',
                headers: {
                    'Content-Type':  'multipart/form-data'
                },
                data: data
            });
            return res.data;
        } catch (err:any) {
            return err.response;
        }
    }
}