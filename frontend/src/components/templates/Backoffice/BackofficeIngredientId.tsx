import "./Backoffice.scss"
import {useParams} from 'react-router-dom';
import BackofficeSection from "../../organismes/Backoffice/BackofficeSection.tsx";
import React, {useEffect, useState} from "react";
import Input from "../../atomes/inputs/Input/Input.tsx";
import Button from "../../atomes/buttons/Button/Button.tsx";
import SelectInput from "../../atomes/inputs/SelectInput/SelectInput.tsx";
import useGetIngredientById from "../../../services/hooks/useGetIngredientById.tsx";
import useDeleteIngredientById from "../../../services/hooks/useDeleteIngredientById.tsx";
import useUpdateIngredientById from "../../../services/hooks/useUpdateIngredientById.tsx";
import SwitchButton from "../../atomes/buttons/SwitchButton/SwitchButton.tsx";

type defaultIngredientProps = {
    id: string,
    name: string,
    category: string,
    allergens: boolean,
    facutlative: boolean
}
export default function BackofficeIngredientId() {
    const getIngredient= useGetIngredientById();
    const deleteIngredient = useDeleteIngredientById();
    const updateIngredient = useUpdateIngredientById();
    const id = useParams().id || ""

    const [ingredient, setIngredient] = useState<defaultIngredientProps | undefined>();
    const [name, setName] = useState("");
    const [allergens, setAllergens] = useState(false);
    const [facutlative, setFacutlative] = useState(false);
    const [category, setCategory] = useState("");
    const [categoryData] = useState([
        {value: "légumes", option: "vegetables"},
        {value: "viandes", option: "meat"},
        {value: "poissons", option: "fish"},
        {value: "produits laitiers", option: "dairy"},
        {value: "fruits", option: "fruits"},
        {value: "épices", option: "spices"},
        {value: "autres", option: "other"},
    ])
    const [categorySelected, setCategorySelected] = useState(0)

    const changeValue = (value: string, id: number) => {
        setCategory(value)
        setCategorySelected(id)
    }

    useEffect(() => {
        (async () => {
            if (id) {
                const data = await getIngredient(id);
                setIngredient(data);
            }
        })();
    }, []);

    useEffect(() => {
        if (name === "" && ingredient) {
            console.log(ingredient);
            setName(ingredient.name);
            setAllergens(ingredient.allergens);
            setFacutlative(ingredient.facutlative);
            setCategory(ingredient.category)
            switch (ingredient.category) {
                case "vegetables":
                    setCategorySelected(0);
                    break;
                case "meat":
                    setCategorySelected(1);
                    break;
                case "fish":
                    setCategorySelected(2);
                    break;
                case "dairy":
                    setCategorySelected(3);
                    break;
                case "fruits":
                    setCategorySelected(4);
                    break;
                case "spices":
                    setCategorySelected(5);
                    break;
                case "other":
                    setCategorySelected(6);
                    break;
                default:
                    setCategorySelected(6);
                    break;
            }
        }
    }, [ingredient]);

    const handleDeleteteIngredient = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("delete ingredient");
        const result = await deleteIngredient(id);
        if (result.status === 401 || result.status === 400) {
            console.error('Delete Ingredient error:', result.data.error);
        } else {
            console.log('Ingredient deleted:', result);
            return window.location.href = "/backoffice/ingredients";
        }
    }

    const handleUpdateIngredient = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("update Ingredient");
        const result = await updateIngredient({
            id: id,
            name: name,
            category: category,
            allergens: allergens,
            facutlative: facutlative
        });
        if (result.status === 401 || result.status === 400) {
            console.error('Update Ingredient error:', result.data.error);
        } else {
            console.log('Ingredient updated:', result);
            return window.location.href = "/backoffice/ingredients";
        }
    }

    return (
        <>
            <main className={"backoffice"}>
                <BackofficeSection
                    content={
                        <form>
                            <Input
                                type={"text"}
                                value={name}
                                placeholder={"Nom"}
                                name={"name"}
                                setValue={setName}
                                color
                            />
                            <SelectInput
                                optionSelected={categorySelected}
                                setOptionSelected={setCategorySelected}
                                contents={categoryData}
                                setValue={changeValue}
                                label={"Catégorie"}
                            />
                            <div className={"group__column"}>
                                <p>allergens</p>
                                <SwitchButton
                                    name={"allergens"}
                                    value={allergens}
                                    setValue={setAllergens}
                                />
                            </div>
                            <div className={"group__column"}>
                                <p>facutlatif</p>
                                <SwitchButton
                                    name={"facutlative"}
                                    value={facutlative}
                                    setValue={setFacutlative}
                                />
                            </div>
                            <Button label={"Supprimer"} color={"danger"}
                                    onclick={(e: React.FormEvent) => handleDeleteteIngredient(e)}/>
                            <Button label={"Modifier"} onclick={(e: React.FormEvent) => handleUpdateIngredient(e)}/>
                        </form>
                    }
                    link={"/backoffice/ingredients"}
                    title={ingredient ? ingredient.name : " "}
                />
            </main>
        </>
    )
}