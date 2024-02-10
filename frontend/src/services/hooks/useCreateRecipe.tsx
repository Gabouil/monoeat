import {AxiosInstance} from '../axios/axiosInstance';

interface FormData {
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
    image: File;
}

export default function useCreateRecipe() {
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
            data.append('image', formData.image);

            const res = await AxiosInstance({
                url: '/recipes',
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