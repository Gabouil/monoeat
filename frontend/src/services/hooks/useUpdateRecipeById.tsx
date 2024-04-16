import {AxiosInstance} from '../axios/axiosInstance';

interface FormData {
    id: string;
    name: string;
    description: string;
    category: string;
    ingredients: { ingredient: string; quantity: number; }[]
    difficulty: string;
    recipeSteps: string[]
    cookTime: { time: number; unit: string; }
    utensils: string[]
    price: number
    nutritionalValues: { calories: number; lipids: number; carbohydrates: number; proteins: number; sels: number; }
    image?: File;
}

export default function useUpdateRecipeById() {
    return async (formData: FormData) => {
        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('description', formData.description);
            data.append('category', formData.category);
            data.append('difficulty', formData.difficulty);
            data.append('ingredients', JSON.stringify(formData.ingredients));
            data.append('recipeSteps', JSON.stringify(formData.recipeSteps));
            data.append('cookTime', JSON.stringify(formData.cookTime));
            data.append('utensils', JSON.stringify(formData.utensils));
            data.append('price', formData.price.toString());
            data.append('nutritionalValues', JSON.stringify(formData.nutritionalValues));
            if (formData.image) {
                data.append('image', formData.image);
            }

            const res = await AxiosInstance({
                url: '/recipes/' + formData.id,
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