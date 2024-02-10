import {AxiosInstance} from '../axios/axiosInstance';

interface FormData {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
    confirmpassword: string;
}

export default function useRegister() {
    return async (formData: FormData) => {
        try {
            const res = await AxiosInstance({
                url: '/users/register',
                method: 'post',
                headers: {
                    'Content-Type':  'multipart/form-data'
                },
                data: {
                    "firstname": formData.firstname,
                    "lastname": formData.lastname,
                    "email": formData.email,
                    "phone": formData.phone,
                    "password": formData.password,
                    "confirmPassword": formData.confirmpassword,
                }
            })
            return res.data
        } catch (err: any) {
            return err.response.data.error;
        }
    }
}