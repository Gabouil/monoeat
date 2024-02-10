import "./Backoffice.scss"
import BackofficeSection from "../../organismes/Backoffice/BackofficeSection.tsx";
import React, {useEffect, useState} from "react";
import Input from "../../atomes/inputs/Input/Input.tsx";
import Button from "../../atomes/buttons/Button/Button.tsx";
import SelectInput from "../../atomes/inputs/Input/SelectInput.tsx";
import useCreateRecipe from "../../../services/hooks/useCreateRecipe.tsx";
import AddStringList from "../../molecules/backoffice/AddStringList/AddStringList.tsx";
import SelectImage from "../../atomes/inputs/SelectImage/SelectImage.tsx";
import AddIngredient from "../../molecules/backoffice/AddIngredient/AddIngredient.tsx";

export default function BackofficeRecipeAdd() {
    const createRecipe = useCreateRecipe()

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<File>();
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
        console.log(value)
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

    useEffect(() => {
        console.log({
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
    }, [name, description, image, ingredients, recipeSteps, cookTime, cookTimeUnit, utensils, price, calories, lipids, carbohydrates, proteins, sels, category, difficulty]);

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
        <>
            <main className={"backoffice"}>
                <BackofficeSection
                    content={
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
                                setImage={setImage}
                            />
                            <AddIngredient
                                setValues={setIngredients}
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
                            <Button label={"Créer le nouvel ingrédient"}
                                    onclick={(e: React.FormEvent) => handleCreateRecipe(e)}/>
                        </form>
                    }
                    link={"/backoffice/recipes"}
                    title={"Nouvel Recette"}
                />
            </main>
        </>
    )
}