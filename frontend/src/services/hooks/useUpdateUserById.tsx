import {AxiosInstance} from "../axios/axiosInstance";

interface FormData {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    role: string;
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
                    "firstname": formData.firstname,
                    "lastname": formData.lastname,
                    "email": formData.email,
                    "phone": formData.phone,
                    "role": formData.role
                }
            });
            return res.data;
        } catch (err:any) {
            return err.response;
        }
    }
}