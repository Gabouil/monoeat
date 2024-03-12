import useUpdateRecipeById from "../../../services/hooks/useUpdateRecipeById.tsx";
import useGetRecipeById from "../../../services/hooks/useGetRecipeById.tsx";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import useCreateRecipe from "../../../services/hooks/useCreateRecipe.tsx";
import Input from "../../atomes/inputs/Input/Input.tsx";
import SelectInput from "../../atomes/inputs/Input/SelectInput.tsx";
import SelectImage from "../../atomes/inputs/SelectImage/SelectImage.tsx";
import AddIngredient from "../../molecules/backoffice/AddIngredient/AddIngredient.tsx";
import AddStringList from "../../molecules/backoffice/AddStringList/AddStringList.tsx";
import Button from "../../atomes/buttons/Button/Button.tsx";
import BackofficeSection from "./BackofficeSection.tsx";
import useDeleteRecipeById from "../../../services/hooks/useDeleteRecipeById.tsx";
import Notification from "../../atomes/Notification/Notification.tsx";


type defaultRecipeProps = {
    id: string,
    name: string,
    description: string,
    category: string,
    ingredients: { ingredient: string; quantity: number; }[]
    difficulty: string,
    recipeSteps: string[]
    cookTime: { time: number; unit: string; }
    utensils: string[]
    price: number
    nutritionalValues: { calories: number; lipids: number; carbohydrates: number; proteins: number; sels: number; }
    image: string;
}

export default function BackofficeRecipesForm({formType = "create"}: { formType: "update" | "create" }) {
    const updateRecipe = useUpdateRecipeById()
    const deleteRecipe = useDeleteRecipeById()
    const getRecipe = useGetRecipeById()
    const createRecipe = useCreateRecipe()

    const [recipe, setRecipe] = useState<defaultRecipeProps>();
    const id = useParams().id || ""
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<File>();
    const [imagePreview, setImagePreview] = useState<string>("");
    const [ingredients, setIngredients] = useState<{ ingredient: string, quantity: number }[]>([]);
    const [recipeSteps, setRecipeSteps] = useState<string[]>([]);
    const [utensils, setUtensils] = useState<string[]>([]);
    const [price, setPrice] = useState<number>(0);

    const [calories, setCalories] = useState<number>(0);
    const [lipids, setLipids] = useState<number>(0);
    const [carbohydrates, setCarbohydrates] = useState<number>(0);
    const [proteins, setProteins] = useState<number>(0);
    const [sels, setSels] = useState<number>(0);


    const [cookTime, setCookTime] = useState<number>(0);
    const [cookTimeUnit, setCookTimeUnit] = useState<string>("min");
    const [cookTimeUnitData] = useState<{ value: string, option: string }[]>([
        {value: "min", option: "min"},
        {value: "h", option: "h"},
    ])
    const [cookTimeUnitSelected, setCookTimeUnitSelected] = useState<number>(0)

    const [category, setCategory] = useState<string>("autres");
    const [categoryData] = useState<{ value: string, option: string }[]>([
        {value: "entrées", option: "entrées"},
        {value: "plats", option: "plats"},
        {value: "desserts", option: "desserts"},
        {value: "autres", option: "autres"}
    ])
    const [categorySelected, setCategorySelected] = useState<number>(3)


    const [difficulty, setDifficulty] = useState<string>("facile");
    const [difficultyData] = useState<{ value: string, option: string }[]>([
        {value: "facile", option: "facile"},
        {value: "moyen", option: "moyen"},
        {value: "difficile", option: "difficile"},
    ])
    const [difficultySelected, setDifficultySelected] = useState<number>(0)


    const changeValue = (value: string, id: number, type?: string) => {
        if (type === "category") {
            setCategory(value)
            setCategorySelected(id)
        } else if (type === "difficulty") {
            setDifficulty(value)
            setDifficultySelected(id)
        } else if (type === "cookTime") {
            setCookTimeUnit(value)
            setCookTimeUnitSelected(id)
        }
    }


    const [error, setError] = useState<string[]>([]);


    useEffect(() => {
        if (formType === "update") {
            (async () => {
                if (id) {
                    const data = await getRecipe(id);
                    setRecipe(data);
                }
            })();
        }
    }, []);

    useEffect(() => {
        if (formType === "update" && name === "" && recipe) {
            setName(recipe.name);
            setDescription(recipe.description);
            setIngredients(recipe.ingredients);
            setRecipeSteps(recipe.recipeSteps);
            setUtensils(recipe.utensils);
            setPrice(recipe.price);
            setCalories(recipe.nutritionalValues.calories);
            setLipids(recipe.nutritionalValues.lipids);
            setCarbohydrates(recipe.nutritionalValues.carbohydrates);
            setProteins(recipe.nutritionalValues.proteins);
            setSels(recipe.nutritionalValues.sels);
            setCategory(recipe.category);
            const categoryIndex = categoryData.findIndex(item => item.value === recipe.category);
            setCategorySelected(categoryIndex !== -1 ? categoryIndex : 0);
            setDifficulty(recipe.difficulty);
            const difficultyIndex = difficultyData.findIndex(item => item.value === recipe.difficulty);
            setDifficultySelected(difficultyIndex !== -1 ? difficultyIndex : 0);
            setCookTime(recipe.cookTime.time);
            setCookTimeUnit(recipe.cookTime.unit);
            const cookTimeIndex = cookTimeUnitData.findIndex(item => item.value === recipe.cookTime.unit);
            setCookTimeUnitSelected(cookTimeIndex !== -1 ? cookTimeIndex : 0);
            setImagePreview(recipe.image);

        }
    }, [recipe]);

    const handleUpdateRecipe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) {
            const result = await updateRecipe({
                id: id,
                name: name,
                description: description,
                ingredients: ingredients,
                recipeSteps: recipeSteps,
                cookTime: {time: cookTime, unit: cookTimeUnit},
                utensils: utensils,
                price: price,
                nutritionalValues: {
                    calories: calories,
                    lipids: lipids,
                    carbohydrates: carbohydrates,
                    proteins: proteins,
                    sels: sels
                },
                category: category,
                difficulty: difficulty
            });
            if (result.status === 401 || result.status === 400) {
                console.error('Create recipe error:', result.data.error);
            } else {
                console.log('Recipe create:', result);
                return window.location.href = "/backoffice/recipes";
            }
        } else {
            const result = await updateRecipe({
                id: id,
                name: name,
                description: description,
                ingredients: ingredients,
                recipeSteps: recipeSteps,
                cookTime: {time: cookTime, unit: cookTimeUnit},
                utensils: utensils,
                price: price,
                nutritionalValues: {
                    calories: calories,
                    lipids: lipids,
                    carbohydrates: carbohydrates,
                    proteins: proteins,
                    sels: sels
                },
                category: category,
                difficulty: difficulty,
                image: image
            });
            if (result.status === 401 || result.status === 400) {
                console.error('Create recipe error:', result.data.error);
            } else {
                console.log('Recipe create:', result);
                return window.location.href = "/backoffice/recipes";
            }
        }
    }

    const handleDeleteteRecipe = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("delete Recipe");
        const result = await deleteRecipe(id);
        if (result.status === 401 || result.status === 400) {
            console.error('Delete recipe error:', result.data);
            setError(result.data);
        } else {
            console.log('Recipe deleted:', result);
            return window.location.href = "/backoffice/ingredients";
        }
    }

    const handleCreateRecipe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (image) {
            console.log("create recipe");
            const result = await createRecipe({
                name: name,
                description: description,
                image: image,
                ingredients: ingredients,
                recipeSteps: recipeSteps,
                cookTime: {time: cookTime, unit: cookTimeUnit},
                utensils: utensils,
                price: price,
                nutritionalValues: {
                    calories: calories,
                    lipids: lipids,
                    carbohydrates: carbohydrates,
                    proteins: proteins,
                    sels: sels
                },
                category: category,
                difficulty: difficulty
            });
            if (result.status === 401 || result.status === 400) {
                console.error('Create recipe error:', result.data.error);
            } else {
                console.log('Recipe create:', result);
                return window.location.href = "/backoffice/recipes";
            }
        }
    }

    return (
        <BackofficeSection
            content={
                <>
                    <Notification
                        title={"L'ingrédient est utilisé dans les recettes suivantes :"}
                        contents={error}
                        setContent={setError}
                        type={"alert"}
                    />
                    <form>
                        <Input
                            label={"Nom"}
                            type={"text"}
                            value={name}
                            placeholder={"Nom"}
                            name={"name"}
                            setValue={setName}
                            color
                        />
                        <Input
                            label={"Description"}
                            type={"text"}
                            value={description}
                            placeholder={"Description"}
                            name={"description"}
                            setValue={setDescription}
                            color
                        />
                        <SelectInput
                            optionSelected={categorySelected}
                            setOptionSelected={setCategorySelected}
                            contents={categoryData}
                            setValue={changeValue}
                            typeSetValue={"category"}
                            label={"Catégorie"}
                        />
                        <SelectImage
                            imageDefault={recipe ? imagePreview : ""}
                            setImage={setImage}
                        />
                        <AddIngredient
                            setValues={setIngredients}
                            ingredientsDefault={recipe ? recipe.ingredients : []}
                        />
                        <AddStringList
                            title={"Liste des étapes de la recette"}
                            listTitle={"Étape"}
                            setValues={setRecipeSteps}
                            values={recipeSteps}
                            inputPlaceholder={"Etape à ajouter"}
                        />
                        <div className={"group__column"}>
                            <p>Temps de cuisine</p>
                            <div className={"group__row"}>
                                <Input
                                    label={"Temps"}
                                    type={"number"}
                                    value={cookTime}
                                    placeholder={"Temps"}
                                    name={"cookTime"}
                                    setValue={setCookTime}
                                    color
                                />
                                <SelectInput
                                    optionSelected={cookTimeUnitSelected}
                                    setOptionSelected={setCookTimeUnitSelected}
                                    contents={cookTimeUnitData}
                                    setValue={changeValue}
                                    typeSetValue={"cookTime"}
                                    label={"Unité"}
                                />
                            </div>
                        </div>
                        <AddStringList
                            title={"Liste des ustensiles nécessaires"}
                            listTitle={"Ustensile"}
                            setValues={setUtensils}
                            values={utensils}
                            inputPlaceholder={"Ustensile à ajouter"}
                        />
                        <SelectInput
                            optionSelected={difficultySelected}
                            setOptionSelected={setDifficultySelected}
                            contents={difficultyData}
                            setValue={changeValue}
                            typeSetValue={"difficulty"}
                            label={"Difficulté"}
                        />
                        <Input
                            label={"Prix"}
                            type={"number"}
                            value={price}
                            placeholder={"Prix"}
                            name={"price"}
                            setValue={setPrice}
                            color
                        />
                        <div className={"group__column"}>
                            <p>Valeurs nutritionnelles</p>
                            <div className={"group__row"}>
                                <Input
                                    label={"Calories"}
                                    type={"number"}
                                    value={calories}
                                    placeholder={"Calories"}
                                    name={"calories"}
                                    setValue={setCalories}
                                    color
                                />
                                <Input
                                    label={"Lipides"}
                                    type={"number"}
                                    value={lipids}
                                    placeholder={"Lipides"}
                                    name={"lipids"}
                                    setValue={setLipids}
                                    color
                                />
                                <Input
                                    label={"Glucides"}
                                    type={"number"}
                                    value={carbohydrates}
                                    placeholder={"Glucides"}
                                    name={"carbohydrates"}
                                    setValue={setCarbohydrates}
                                    color
                                />
                                <Input
                                    label={"Protéines"}
                                    type={"number"}
                                    value={proteins}
                                    placeholder={"Protéines"}
                                    name={"proteins"}
                                    setValue={setProteins}
                                    color
                                />
                                <Input
                                    label={"Sels"}
                                    type={"number"}
                                    value={sels}
                                    placeholder={"Sels"}
                                    name={"sels"}
                                    setValue={setSels}
                                    color
                                />
                            </div>
                        </div>
                        {formType === "update" ?
                            <>

                                <Button label={"Supprimer la recette"} color={"danger"}
                                        onclick={(e: React.FormEvent) => handleDeleteteRecipe(e)}/>
                                <Button label={"Modifier la recette"}
                                        onclick={(e: React.FormEvent) => handleUpdateRecipe(e)}/>
                            </>
                            :

                            <Button label={"Créer une nouvel recette"}
                                    onclick={(e: React.FormEvent) => handleCreateRecipe(e)}/>
                        }
                    </form>
                </>
            }
            link={"/backoffice/recipes"}
            title={formType === "update" ? `Modifier la recette ${recipe?.name}` : "Créer une nouvelle recette"}
        />
    )
}